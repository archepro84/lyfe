import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtServicePayload } from '@application/port/common/jwt/jwt.port';
import {
  TOKEN_USECASE,
  TokenUsecase,
} from '@application/port/in/auth/token/token.usecase';
import { EnvironmentConfigService } from '@adapter/config/environment-config.service';
import { LoggerAdapter } from '@adapter/common/logger/logger.adapter';
import { User } from '@domain/user/user';
import { UnauthorizedException } from '@domain/common/exception/unauthorized.exception';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(TOKEN_USECASE)
    private readonly tokenUsecase: TokenUsecase<User>,
    private readonly configService: EnvironmentConfigService,
    private readonly logger: LoggerAdapter,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.AccessToken;
        },
      ]),
      secretOrKey: configService.getJwtSecret(),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: JwtServicePayload) {
    const user = await this.tokenUsecase.getAccountable(payload);

    if (!user) {
      this.logger.warn('JwtStrategy', 'User not found or hash not correct.');
      throw new UnauthorizedException(
        '유저를 찾을 수 없거나, 인증에 실패하였습니다.',
      );
    }

    return user;
  }
}
