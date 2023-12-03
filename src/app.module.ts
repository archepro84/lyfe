import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DomainModule } from '@domain/domain.module';
import { ApplicationModule } from '@application/application.module';
import { AdapterModule } from '@adapter/adapter.module';
import { EnvironmentConfigModule } from '@adapter/config/environment-config.module';
import { BcryptModule } from '@adapter/common/bcrypt/bcrypt.module';
import { JwtModule } from '@adapter/common/jwt/jwt.module';
import { JwtStrategy } from '@adapter/common/strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { LoggerModule } from '@adapter/common/logger/logger.module';
import { JwtAdminStrategy } from '@adapter/common/strategy/jwt-admin.strategy';
import { JwtRefreshStrategy } from '@adapter/common/strategy/jwt-refresh.strategy';
import { JwtAdminRefreshStrategy } from '@adapter/common/strategy/jwt-admin-refresh.strategy';

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
