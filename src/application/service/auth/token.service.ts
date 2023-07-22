import { User } from '@domain/user/user';
import { UserRepository } from '@application/port/out/user/user.repository';
import { TokenUsecase } from '@application/port/in/auth/token.usecase';
import { JwtConfig } from '@domain/config/jwt.config';
import {
  JwtPort,
  JwtServicePayload,
} from '@application/port/security/jwt/jwt.port';
import { AuthToken } from '@domain/user/auth-token';
import { BcryptPort } from '@application/port/security/bcrypt/bcrypt.port';

export class TokenService implements TokenUsecase {
  constructor(
    private readonly userRepository: UserRepository,
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

  /**
   * 리프레시 토큰을 관리할 User 에서는 어떤 방식으로 관리해야하는가?
   * Refresh Token이 만약 DB에 저장되어 있다면, DB에서 해당 유저의 리프레시 토큰을 조회하여
   * 현재의 리프레시 토큰과 일치하는지 확인한다.
   * 그런데, 특정 갯수를 초과한 리프레시토큰일 경우 어떻게 처리하는게 맞는가?
   * 예를들어 최대 관리 토큰 갯수를 5개로 설정했을 때, 6번째 토큰이 발급되면 어떻게 처리해야하는가?
   * 토큰을 관리하기 위한 정보를 Users 테이블에 컬럼으로 추가하여, 객체 형태로 관리하도록한다.
   * Key: Refresh Token
   * Value: { 기기명, 기기종류, 토큰 생성 날짜 등 ...}
   * **/
  async getUserIfRefreshTokenMatches(
    refreshToken: AuthToken,
    payload: JwtServicePayload,
  ): Promise<User> {
    const user = await this.userRepository.getUser(payload.userId);
    if (!user) return null;

    const isRefreshTokenMatching = await this.bcryptPort.compare(
      refreshToken.token,
      user.getAuthToken().token,
    );
    if (isRefreshTokenMatching) return user;

    return null;
  }

  async setCurrentRefreshToken(
    refreshToken: AuthToken,
    payload: JwtServicePayload,
  ): Promise<void> {
    const hashedRefreshToken = await this.bcryptPort.hash(refreshToken.token);

    await this.userRepository.updateRefreshToken(
      payload.userId,
      new AuthToken(hashedRefreshToken),
    );
  }
}
