import { TokenUsecase } from '@application/port/in/auth/token/token.usecase';
import { JwtConfig } from '@application/port/common/config/jwt.config';
import {
  JwtPort,
  JwtServicePayload,
} from '@application/port/common/jwt/jwt.port';
import { AuthToken } from '@domain/user/auth-token';
import { BcryptPort } from '@application/port/common/bcrypt/bcrypt.port';
import { TokenRepository } from '@application/port/out/auth/token.repository';
import { Accountable } from '@domain/auth/accountable';

export class TokenService<T extends Accountable> implements TokenUsecase<T> {
  constructor(
    private readonly tokenRepository: TokenRepository<T>,
    private readonly jwtConfig: JwtConfig,
    private readonly jwtPort: JwtPort,
    private readonly bcryptPort: BcryptPort,
  ) {}

  async getAccountable(payload: JwtServicePayload): Promise<T | null> {
    return await this.tokenRepository.getById(payload.id);
  }

  async getJwtAccessToken(payload: JwtServicePayload): Promise<AuthToken> {
    const secret = this.jwtConfig.getJwtSecret();
    const expiresIn = this.jwtConfig.getJwtExpirationTime() + 's';
    return AuthToken.newInstance(
      this.jwtPort.createToken(payload, secret, expiresIn),
    );
  }

  async parseCookieByJwtAccessToken(refreshToken: AuthToken): Promise<string> {
    return `AccessToken=${
      refreshToken.token
    }; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtExpirationTime()}`;
  }

  async getJwtRefreshToken(payload: JwtServicePayload): Promise<AuthToken> {
    const secret = this.jwtConfig.getJwtRefreshSecretKey();
    const expiresIn = this.jwtConfig.getJwtRefreshExpirationTime() + 's';
    const refreshToken = AuthToken.newInstance(
      this.jwtPort.createToken(payload, secret, expiresIn),
    );

    await this.setCurrentRefreshToken(refreshToken, payload);

    return refreshToken;
  }

  async parseCookieByJwtRefreshToken(refreshToken: AuthToken): Promise<string> {
    return `RefreshToken=${
      refreshToken.token
    }; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtRefreshExpirationTime()}`;
  }

  async getAccountableIfRefreshTokenMatches(
    refreshToken: AuthToken,
    payload: JwtServicePayload,
  ): Promise<T> {
    const accountable = await this.getAccountable(payload);
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
      AuthToken.newInstance(hashedRefreshToken),
    );
  }
}
