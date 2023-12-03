import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { BcryptPort } from '@application/port/common/bcrypt/bcrypt.port';

@Injectable()
export class BcryptAdapter implements BcryptPort {
  rounds = 10;

  async hash(hashString: string): Promise<string> {
    return bcrypt.hash(hashString, this.rounds);
  }

  async compare(password: string, hashPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }
}
