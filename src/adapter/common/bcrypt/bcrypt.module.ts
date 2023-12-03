import { Module } from '@nestjs/common';
import { BcryptAdapter } from '@adapter/common/bcrypt/bcrypt.adapter';

@Module({
  providers: [BcryptAdapter],
  exports: [BcryptAdapter],
})
export class BcryptModule {}
