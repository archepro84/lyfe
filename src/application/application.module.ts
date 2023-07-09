import { Module } from '@nestjs/common';
import { DomainModule } from '@domain/domain.module';

@Module({
  imports: [DomainModule],
  providers: [],
  exports: [],
})
export class ApplicationModule {}
