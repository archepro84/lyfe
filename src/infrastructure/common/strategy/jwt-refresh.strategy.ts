import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtServicePayload } from '@application/common/jwt/jwt.port';
import {
  TOKEN_USECASE,
  TokenUsecase,
} from '@application/port/in/auth/token/token.usecase';
import { EnvironmentConfigService } from '@infrastructure/common/config/environment-config.service';
import { LoggerAdapter } from '@infrastructure/common/logger/logger.adapter';
import { AuthToken } from '@domain/user/auth-token';
import { User } from '@domain/user/user';
import { UnauthorizedException } from '@domain/common/exception/unauthorized.exception';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @Inject(TOKEN_USECASE)
    private readonly tokenUsecase: TokenUsecase<User>,
    private readonly configService: EnvironmentConfigService,
    private readonly logger: LoggerAdapter,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.RefreshToken;
        },
      ]),
      secretOrKey: configService.getJwtRefreshSecretKey(),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: JwtServicePayload) {
    const authToken = request.cookies?.RefreshToken;
    const user = await this.tokenUsecase.getAccountableIfRefreshTokenMatches(
      AuthToken.newInstance(authToken),
      payload,
    );

    if (!user) {
      this.logger.warn('JwtStrategy', 'User not found or hash not correct.');
      throw new UnauthorizedException(
        '유저를 찾을 수 없거나, 인증에 실패하였습니다.',
      );
    }

    return user;
  }
}
