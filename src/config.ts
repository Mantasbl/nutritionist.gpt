import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const CONFIG = {
  APP: registerAs<AppOptions>('app', () => {
    return {
      swaggerEnabled: process.env.ENV !== 'production',
      allowedOrigins: process.env.APP_ALLOWED_ORIGINS,
      port: Number(process.env.APP_PORT) || 4000,
      prefix: process.env.APP_PREFIX || 'api',
      version: process.env.APP_VERSION || 'unknown',
      devMode: process.env.ENV !== 'production',
      environment: process.env.ENV || 'development',
      name: process.env.APP_NAME || 'unknown',
      title: process.env.APP_TITLE || 'unknown',
      description: process.env.APP_DESCRIPTION || 'unknown',
    };
  }),
  DB: registerAs<DataSourceOptions>('database', () => {
    return {
      type: 'postgres',
      host: process.env.DB_HOST || 'unknown',
      port: Number(process.env.DB_PORT) || 25060,
      username: process.env.DB_USER_NAME || 'unknown',
      password: process.env.DB_USER_PASSWORD || 'unknown',
      database: process.env.DB_NAME || 'unknown',
      namingStrategy: new SnakeNamingStrategy(),
      logging: process.env.ENV !== 'production',
      migrations: {
        tableName: 'migrations',
        path: 'dist/infrastructure/persistence/migrations/*{.ts,.js}',
      },
      migrationsRun: true,
      synchronize: false,
      entities: [`dist/infrastructure/persistence/entities/*{.ts,.js}`],
    };
  }),

  PASSPORT_JWT: registerAs<PassportJWTOptions>('passport-jwt', () => {
    return {
      secret: process.env.JWT_SECRET || 'unknown',
      expiresIn: process.env.JWT_EXPIRES_IN || '12h',
    };
  }),

  AUTH: registerAs<AuthOptions>('auth', () => {
    return {
      salt: process.env.PASSWORD_SALT || 'unknown',
    };
  }),
};

export interface AppOptions {
  readonly allowedOrigins?: string;

  readonly environment: string;

  readonly port: number;

  readonly prefix: string;

  readonly version: string;

  readonly name: string;

  readonly title: string;

  readonly description: string;

  readonly swaggerEnabled: boolean;

  readonly devMode: boolean;
}

export interface PassportJWTOptions {
  readonly secret: string;
  readonly expiresIn: string;
}

export interface AuthOptions {
  readonly salt: string;
}
