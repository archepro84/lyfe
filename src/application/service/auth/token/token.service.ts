import { TokenUsecase } from '@application/port/in/auth/token/token.usecase';
import { JwtConfig } from '@domain/config/jwt.config';
import {
  JwtPort,
  JwtServicePayload,
} from '@application/port/security/jwt/jwt.port';
import { AuthToken } from '@domain/user/auth-token';
import { BcryptPort } from '@application/port/security/bcrypt/bcrypt.port';
import { TokenRepository } from '@application/port/out/auth/token.repository';
import { Accountable } from '@domain/auth/accountable';

export class TokenService<T extends Accountable> implements TokenUsecase<T> {
  constructor(
    private readonly tokenRepository: TokenRepository<T>,
    private readonly jwtConfig: JwtConfig,
    private readonly jwtPort: JwtPort,
    private readonly bcryptPort: BcryptPort,
  ) {}

  async getJwtRefreshToken(payload: JwtServicePayload): Promise<AuthToken> {
    const secret = this.jwtConfig.getJwtRefreshSecretKey();
    const expiresIn = this.jwtConfig.getJwtRefreshExpirationTime() + 's';
    const token = new AuthToken(
      this.jwtPort.createToken(payload, secret, expiresIn),
    );

    await this.setCurrentRefreshToken(token, payload);

    return token;
  }

  async parseCookieByJwtRefreshToken(refreshToken: AuthToken): Promise<string> {
    return `Refresh=${
      refreshToken.token
    }; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtRefreshExpirationTime()}`;
  }

  async getAccountableIfRefreshTokenMatches(
    refreshToken: AuthToken,
    payload: JwtServicePayload,
  ): Promise<T> {
    const accountable = await this.tokenRepository.getById(payload.id);
    if (!accountable) return null;

    const isRefreshTokenMatching = await this.bcryptPort.compare(
      refreshToken.token,
      accountable.getAuthToken().token,
    );
    if (isRefreshTokenMatching) return accountable;

    return null;
  }

  async setCurrentRefreshToken(
    refreshToken: AuthToken,
    payload: JwtServicePayload,
  ): Promise<void> {
    const hashedRefreshToken = await this.bcryptPort.hash(refreshToken.token);

    await this.tokenRepository.updateRefreshToken(
      payload.id,
      new AuthToken(hashedRefreshToken),
    );
  }
}
