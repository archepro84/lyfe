import { Injectable } from '@nestjs/common';
import {
  JwtPort,
  JwtServicePayload,
} from '@application/port/security/jwt/jwt.port';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAdapter implements JwtPort {
  constructor(private readonly jwtService: JwtService) {}

  async checkToken(token: string): Promise<any> {
    return await this.jwtService.verifyAsync(token);
  }

  createToken(
    payload: JwtServicePayload,
    secret: string,
    expiresIn: string,
  ): string {
    return this.jwtService.sign(payload, { secret, expiresIn });
  }
}
