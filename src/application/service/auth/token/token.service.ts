import { User } from '@domain/user/user';
import { UserRepository } from '@application/port/out/user/user.repository';
import { TokenUsecase } from '@application/port/in/auth/token/token.usecase';
import { JwtConfig } from '@domain/config/jwt.config';
import {
  JwtPort,
  JwtServicePayload,
} from '@application/port/security/jwt/jwt.port';
import { AuthToken } from '@domain/user/auth-token';
import { BcryptPort } from '@application/port/security/bcrypt/bcrypt.port';
import { AdminRepository } from '@application/port/out/admin/admin.repository';
import { Admin } from '@domain/admin/admin';

export class TokenService implements TokenUsecase {
  constructor(
    private readonly tokenRepository: UserRepository | AdminRepository,
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
  ): Promise<User | Admin> {
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
