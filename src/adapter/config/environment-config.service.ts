import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServiceConfig } from '@application/port/common/config/service.config';
import { DatabaseConfig } from '@application/port/common/config/database.config';
import { JwtConfig } from '@application/port/common/config/jwt.config';
import { SnsConfig } from '@application/port/common/config/sns.config';

@Injectable()
export class EnvironmentConfigService
  implements ServiceConfig, DatabaseConfig, JwtConfig, SnsConfig
{
  constructor(private readonly configService: ConfigService) {}

  getServiceName(): string {
    return this.configService.get<string>('SERVICE_NAME');
  }

  getDatabaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL');
  }

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET_KEY');
  }

  getJwtExpirationTime(): number {
    return this.configService.get<number>('JWT_EXPIRATION_TIME');
  }

  getJwtRefreshSecretKey(): string {
    return this.configService.get<string>('JWT_REFRESH_SECRET_KEY');
  }

  getJwtRefreshExpirationTime(): number {
    return this.configService.get<number>('JWT_REFRESH_EXPIRATION_TIME');
  }

  getAwsSnsRegion(): string {
    return this.configService.get<string>('AWS_SNS_REGION');
  }
}
