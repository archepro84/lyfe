import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from '@common/config/environment-config.validation';
import { EnvironmentConfigService } from '@common/config/environment-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/env/${
        process.env.NODE_ENV ?? 'local'
      }.env`,
      ignoreEnvFile: false,
      cache: true, // 캐싱, 파일이 아닌 메모리에서 값을 읽어오도록 설정한다.
      expandVariables: true,
      validate,
    }),
  ],
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
