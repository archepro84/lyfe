import { AuthToken } from '@domain/user/auth-token';
import { JwtServicePayload } from '@application/port/security/jwt/jwt.port';

export interface TokenUsecase<T> {
  getAccountable(payload: JwtServicePayload): Promise<T>;

  getJwtAccessToken(payload: JwtServicePayload): Promise<AuthToken>;

  parseCookieByJwtAccessToken(authToken: AuthToken): Promise<string>;

  getJwtRefreshToken(payload: JwtServicePayload): Promise<AuthToken>;

  parseCookieByJwtRefreshToken(authToken: AuthToken): Promise<string>;

  setCurrentRefreshToken(
    authToken: AuthToken,
    payload: JwtServicePayload,
  ): Promise<void>;

  getAccountableIfRefreshTokenMatches(
    authToken: AuthToken,
    payload: JwtServicePayload,
  ): Promise<T>;
}

export const TOKEN_USECASE = Symbol('TokenUsecase');
export const ADMIN_TOKEN_USECASE = Symbol('AdminTokenUsecase');
