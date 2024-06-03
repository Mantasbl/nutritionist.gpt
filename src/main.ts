import { HttpModule } from '@nestjs/axios';
import { INestApplication, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AppOptions, CONFIG } from 'config';
import { AuthServiceImpl } from 'domain/services/auth';
import { UserServiceImpl } from 'domain/services/user';
import { AuthController } from 'entrypoints/api/controllers/auth-controller';
import { UserController } from 'entrypoints/api/controllers/user-controller';
import { installDocumentation } from 'framework/documentation';
import { HealthCheckModule } from 'framework/health-check/module';
import { NutritionistChatModule } from 'framework/modules/nutritionist.module';
import { factory } from 'framework/provider';
import { AuthModule } from 'infrastructure/client/auth/module';
import { DatabaseModule } from 'infrastructure/persistence/database.module';
import { UserEntityManager } from 'infrastructure/persistence/repositories/user';

@Module({
  imports: [
    ConfigModule.forRoot({ load: Object.values(CONFIG), isGlobal: true }),
    HttpModule,
    HealthCheckModule,
    DatabaseModule,
    AuthModule,
    NutritionistChatModule,
  ],
  controllers: [AuthController, UserController],
  providers: [
    JwtService,
    factory(AuthServiceImpl, [JwtService, UserEntityManager]),
    factory(UserServiceImpl, [UserEntityManager]),
  ],
})
export class MainModule {
  static async run(): Promise<any> {
    const options = CONFIG.APP() as AppOptions;
    try {
      const app = await NestFactory.create<INestApplication>(MainModule);

      app.enableCors({ origin: options.allowedOrigins || false });
      app.setGlobalPrefix(options.prefix);
      app.flushLogs();

      if (options.swaggerEnabled) {
        installDocumentation(app, options);
      }
      return await app.listen(options.port, '0.0.0.0');
    } catch (error: unknown) {
      console.error(`${MainModule.name}: failed`);
      process.exit(1);
    }
  }
}

MainModule.run();
