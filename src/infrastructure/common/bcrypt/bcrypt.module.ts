import { Module } from '@nestjs/common';
import { BcryptAdapter } from '@infrastructure/common/bcrypt/bcrypt.adapter';

@Module({
  providers: [BcryptAdapter],
  exports: [BcryptAdapter],
})
export class BcryptModule {}
