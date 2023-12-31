import { Module } from '@nestjs/common';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { EnvironmentConfigModule } from '@infrastructure/common/config/environment-config.module';
import { EnvironmentConfigService } from '@infrastructure/common/config/environment-config.service';
import { JwtAdapter } from '@infrastructure/common/jwt/jwt.adapter';

@Module({
  imports: [
    Jwt.registerAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: (configService: EnvironmentConfigService) => ({
        secret: configService.getJwtRefreshSecretKey(),
        signOptions: {
          expiresIn: configService.getJwtRefreshExpirationTime() + 's',
        },
      }),
    }),
  ],
  providers: [JwtAdapter],
  exports: [JwtAdapter],
})
export class JwtModule {}
