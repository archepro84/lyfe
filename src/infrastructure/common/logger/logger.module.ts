import { Module } from '@nestjs/common';
import { LoggerAdapter } from '@infrastructure/common/logger/logger.adapter';

@Module({
  providers: [LoggerAdapter],
  exports: [LoggerAdapter],
})
export class LoggerModule {}
