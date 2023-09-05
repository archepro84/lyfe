import { AdminRepository } from '@application/port/out/admin/admin.repository';
import { BcryptPort } from '@application/port/security/bcrypt/bcrypt.port';
import { Admin } from '@domain/admin/admin';
import { SignInAdminUsecase } from '@application/port/in/admin/sign-in-admin.usecase';
import { SignInAdminCommand } from '@application/port/in/admin/command/sign-in-admin.command';
import { AuthenticationFailedException } from '@application/service/admin/exception/authentication-failed.exception';
import { TokenUsecase } from '@application/port/in/auth/token/token.usecase';
import { AuthVerificationResponseCommand } from '@application/port/in/auth/command/auth.command';

export class SignInAdminService implements SignInAdminUsecase {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly bcryptPort: BcryptPort,
    private readonly tokenUsecase: TokenUsecase<Admin>,
  ) {}

  async exec(
    signInAdminCommand: SignInAdminCommand,
  ): Promise<AuthVerificationResponseCommand<Admin>> {
    const { email, password } = signInAdminCommand;

    const admin = await this.adminRepository.getAdminByEmail(email);
    if (!admin || !(await this.bcryptPort.compare(password, admin.password)))
      throw new AuthenticationFailedException(
        '어드민 로그인에 실패하였습니다.',
      );

    const authToken = await this.tokenUsecase.getJwtRefreshToken({
      id: admin.id,
    });

    const cookieWithRefreshToken =
      await this.tokenUsecase.parseCookieByJwtRefreshToken(authToken);

    admin.setAuthToken(authToken);

    return new AuthVerificationResponseCommand<Admin>(
      admin,
      cookieWithRefreshToken,
    );
  }
}
