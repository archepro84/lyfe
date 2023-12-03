import { Module } from '@nestjs/common';
import { SnsAdapter } from '@adapter/out/messaging/sns/sns.adapter';
import { EnvironmentConfigService } from '@adapter/config/environment-config.service';
import { EnvironmentConfigModule } from '@adapter/config/environment-config.module';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [SnsAdapter, EnvironmentConfigService],
  exports: [SnsAdapter],
})
export class SnsModule {}
