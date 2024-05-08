import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserEntityManager } from 'infrastructure/persistence/repositories/user';
import { JwtStrategy } from 'entrypoints/api/auth/jwt.strategy';

import { CONFIG, PassportJWTOptions } from '../../../config';
import { factory } from '../../../framework/provider';
import { AuthServiceImpl } from 'domain/services/auth';
import { DatabaseModule } from 'infrastructure/persistence/database.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [CONFIG.PASSPORT_JWT.KEY],
      useFactory: (options: PassportJWTOptions) => ({
        secret: options.secret,
        secretOrPrivateKey: options.secret,
        signOptions: { expiresIn: options.expiresIn },
      }),
    }),
    DatabaseModule,
  ],
  providers: [UserEntityManager, JwtService, factory(AuthServiceImpl, [JwtService, UserEntityManager]), JwtStrategy],
  exports: [AuthServiceImpl],
})
export class AuthModule {}
