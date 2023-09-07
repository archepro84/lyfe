import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtServicePayload } from '@application/port/security/jwt/jwt.port';
import {
  ADMIN_TOKEN_USECASE,
  TokenUsecase,
} from '@application/port/in/auth/token/token.usecase';
import { EnvironmentConfigService } from '@common/config/environment-config.service';
import { LoggerAdapter } from '@adapter/common/logger/logger.adapter';
import { NotFoundException } from '@common/exception/not-found.exception';
import { AuthToken } from '@domain/user/auth-token';
import { Admin } from '@domain/admin/admin';

@Injectable()
export class JwtAdminRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-admin-refresh',
) {
  constructor(
    @Inject(ADMIN_TOKEN_USECASE)
    private readonly tokenUsecase: TokenUsecase<Admin>,
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

  // FIXME: Admin Environment Key 추가하기
  async validate(request: Request, payload: JwtServicePayload) {
    const refreshToken = request.cookies?.RefreshToken;
    const admin = await this.tokenUsecase.getAccountableIfRefreshTokenMatches(
      AuthToken.newInstance(refreshToken),
      payload,
    );

    if (!admin) {
      this.logger.warn('JwtStrategy', 'Admin not found or hash not correct.');
      throw new NotFoundException(
        '관리자를 찾을 수 없거나, 인증에 실패하였습니다.',
      );
    }

    return admin;
  }
}
