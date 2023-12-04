import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtServicePayload } from '@application/common/jwt/jwt.port';
import {
  ADMIN_TOKEN_USECASE,
  TokenUsecase,
} from '@application/port/in/auth/token/token.usecase';
import { EnvironmentConfigService } from '@infrastructure/common/config/environment-config.service';
import { LoggerAdapter } from '@infrastructure/common/logger/logger.adapter';
import { Admin } from '@domain/admin/admin';
import { UnauthorizedException } from '@domain/common/exception/unauthorized.exception';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor(
    @Inject(ADMIN_TOKEN_USECASE)
    private readonly tokenUsecase: TokenUsecase<Admin>,
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

  // FIXME: Admin Environment Key 추가하기
  async validate(request: Request, payload: JwtServicePayload) {
    const admin = await this.tokenUsecase.getAccountable(payload);

    if (!admin) {
      this.logger.warn('JwtStrategy', 'Admin not found or hash not correct.');
      throw new UnauthorizedException(
        '관리자를 찾을 수 없거나, 인증에 실패하였습니다.',
      );
    }
    return admin;
  }
}
