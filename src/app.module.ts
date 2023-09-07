import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DomainModule } from '@domain/domain.module';
import { ApplicationModule } from '@application/application.module';
import { AdapterModule } from '@adapter/adapter.module';
import { EnvironmentConfigModule } from '@common/config/environment-config.module';
import { BcryptModule } from '@adapter/security/bcrypt/bcrypt.module';
import { JwtModule } from '@adapter/security/jwt/jwt.module';
import { JwtStrategy } from '@common/strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { LoggerModule } from '@adapter/common/logger/logger.module';
import { JwtAdminStrategy } from '@common/strategy/jwt-admin.strategy';
import { JwtRefreshStrategy } from '@common/strategy/jwt-refresh.strategy';
import { JwtAdminRefreshStrategy } from '@common/strategy/jwt-admin-refresh.strategy';

@Module({
  imports: [
    PassportModule,
    EnvironmentConfigModule,
    BcryptModule,
    JwtModule,
    LoggerModule,
    DomainModule,
    ApplicationModule,
    AdapterModule,
  ],
  controllers: [AppController],
  providers: [
    JwtStrategy,
    JwtRefreshStrategy,
    JwtAdminStrategy,
    JwtAdminRefreshStrategy,
  ],
})
export class AppModule {}
