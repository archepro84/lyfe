import { User } from '@domain/user/user';
import { AuthToken } from '@domain/user/auth-token';
import { JwtServicePayload } from '@application/port/security/jwt/jwt.port';

export interface TokenUsecase {
  getJwtRefreshToken(payload: JwtServicePayload): Promise<AuthToken>;

  parseCookieByJwtRefreshToken(authToken: AuthToken): Promise<string>;

  setCurrentRefreshToken(
    authToken: AuthToken,
    payload: JwtServicePayload,
  ): Promise<void>;

  getUserIfRefreshTokenMatches(
    authToken: AuthToken,
    payload: JwtServicePayload,
  ): Promise<User>;
}

export const TOKEN_USECASE = Symbol('TokenUsecase');
