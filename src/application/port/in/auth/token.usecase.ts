import { User } from '@domain/user/user';
import { RefreshToken } from '@domain/user/refresh-token';
import { JwtServicePayload } from '@application/port/security/jwt/jwt.port';

export interface TokenUsecase {
  getJwtRefreshToken(payload: JwtServicePayload): Promise<RefreshToken>;

  parseCookieByJwtRefreshToken(refreshToken: RefreshToken): Promise<string>;

  setCurrentRefreshToken(
    refreshToken: RefreshToken,
    payload: JwtServicePayload,
  ): Promise<void>;

  getUserIfRefreshTokenMatches(
    refreshToken: RefreshToken,
    payload: JwtServicePayload,
  ): Promise<User>;
}

export const TOKEN_USECASE = Symbol('TokenUsecase');
