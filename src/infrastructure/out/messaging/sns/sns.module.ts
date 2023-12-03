import { Module } from '@nestjs/common';
import { SnsAdapter } from '@infrastructure/out/messaging/sns/sns.adapter';
import { EnvironmentConfigService } from '@infrastructure/common/config/environment-config.service';
import { EnvironmentConfigModule } from '@infrastructure/common/config/environment-config.module';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [SnsAdapter, EnvironmentConfigService],
  exports: [SnsAdapter],
})
export class SnsModule {}
