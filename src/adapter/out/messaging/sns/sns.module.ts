import { Module } from '@nestjs/common';
import { SnsAdapter } from '@adapter/out/messaging/sns/sns.adapter';

@Module({
  providers: [SnsAdapter],
  exports: [SnsAdapter],
})
export class SnsModule {}
