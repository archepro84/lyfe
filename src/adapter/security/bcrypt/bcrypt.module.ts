import { Module } from '@nestjs/common';
import { BcryptAdapter } from '@adapter/security/bcrypt/bcrypt.adapter';

@Module({
  providers: [BcryptAdapter],
  exports: [BcryptAdapter],
})
export class BcryptModule {}
