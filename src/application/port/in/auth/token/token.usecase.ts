import { User } from '@domain/user/user';
import { AuthToken } from '@domain/user/auth-token';
import { JwtServicePayload } from '@application/port/security/jwt/jwt.port';
import { Admin } from '@domain/admin/admin';

export interface TokenUsecase {
  getJwtRefreshToken(payload: JwtServicePayload): Promise<AuthToken>;

  parseCookieByJwtRefreshToken(authToken: AuthToken): Promise<string>;

  setCurrentRefreshToken(
    authToken: AuthToken,
    payload: JwtServicePayload,
  ): Promise<void>;

  getAccountableIfRefreshTokenMatches(
    authToken: AuthToken,
    payload: JwtServicePayload,
  ): Promise<User | Admin>;
}

export const TOKEN_USECASE = Symbol('TokenUsecase');
export const ADMIN_TOKEN_USECASE = Symbol('AdminTokenUsecase');
