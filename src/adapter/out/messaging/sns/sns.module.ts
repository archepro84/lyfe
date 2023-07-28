import { Module } from '@nestjs/common';
import { SnsAdapter } from '@adapter/out/messaging/sns/sns.adapter';
import { EnvironmentConfigService } from '@common/config/environment-config.service';
import { EnvironmentConfigModule } from '@common/config/environment-config.module';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [SnsAdapter, EnvironmentConfigService],
  exports: [SnsAdapter],
})
export class SnsModule {}
