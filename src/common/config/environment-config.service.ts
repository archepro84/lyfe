import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServiceConfig } from '@domain/config/service.config';
import { DatabaseConfig } from '@domain/config/database.config';
import { JwtConfig } from '@domain/config/jwt.config';

@Injectable()
export class EnvironmentConfigService
  implements ServiceConfig, DatabaseConfig, JwtConfig
{
  constructor(private readonly configService: ConfigService) {}

  getServiceName(): string {
    return this.configService.get<string>('SERVICE_NAME');
  }

  getDatabaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL');
  }

  getJwtExpirationTime(): number {
    return this.configService.get<number>('JWT_EXPIRATION_TIME');
  }

  getJwtRefreshExpirationTime(): number {
    return this.configService.get<number>('JWT_REFRESH_EXPIRATION_TIME');
  }

  getJwtRefreshSecretKey(): string {
    return this.configService.get<string>('JWT_REFRESH_SECRET_KEY');
  }

  getJwtSecretKey(): string {
    return this.configService.get<string>('JWT_SECRET_KEY');
  }
}
