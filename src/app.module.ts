import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DomainModule } from '@domain/domain.module';
import { ApplicationModule } from '@application/application.module';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { EnvironmentConfigModule } from '@infrastructure/common/config/environment-config.module';
import { BcryptModule } from '@infrastructure/common/bcrypt/bcrypt.module';
import { JwtModule } from '@infrastructure/common/jwt/jwt.module';
import { JwtStrategy } from '@infrastructure/common/strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { LoggerModule } from '@infrastructure/common/logger/logger.module';
import { JwtAdminStrategy } from '@infrastructure/common/strategy/jwt-admin.strategy';
import { JwtRefreshStrategy } from '@infrastructure/common/strategy/jwt-refresh.strategy';
import { JwtAdminRefreshStrategy } from '@infrastructure/common/strategy/jwt-admin-refresh.strategy';

@Module({
  imports: [
    PassportModule,
    EnvironmentConfigModule,
    BcryptModule,
    JwtModule,
    LoggerModule,
    DomainModule,
    ApplicationModule,
    InfrastructureModule,
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
