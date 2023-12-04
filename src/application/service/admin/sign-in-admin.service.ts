import { AdminRepository } from '@application/port/out/admin/admin.repository';
import { BcryptPort } from '@application/common/bcrypt/bcrypt.port';
import { Admin } from '@domain/admin/admin';
import { SignInAdminUsecase } from '@application/port/in/admin/sign-in-admin.usecase';
import { SignInAdminCommand } from '@application/port/in/admin/command/sign-in-admin.command';
import { AuthenticationFailedException } from '@application/service/admin/exception/authentication-failed.exception';
import { TokenUsecase } from '@application/port/in/auth/token/token.usecase';
import { AuthVerificationResponseCommand } from '@application/port/in/auth/command/auth.command';
import { AuthToken } from '@domain/user/auth-token';

export class SignInAdminService implements SignInAdminUsecase {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly bcryptPort: BcryptPort,
    private readonly tokenUsecase: TokenUsecase<Admin>,
  ) {}

  async exec(
    signInAdminCommand: SignInAdminCommand,
  ): Promise<AuthVerificationResponseCommand<Admin>> {
    const admin = await this.verifyAdmin(signInAdminCommand);

    const accessToken = await this.generateAccessToken(admin.id);
    const refreshToken = await this.generateRefreshToken(admin.id);

    admin.setAuthToken(refreshToken);

    return new AuthVerificationResponseCommand<Admin>(
      admin,
      accessToken,
      refreshToken,
    );
  }

  private async verifyAdmin(
    signInAdminCommand: SignInAdminCommand,
  ): Promise<Admin> {
    const { email, password } = signInAdminCommand;

    const admin = await this.adminRepository.getAdminByEmail(email);

    if (!admin || !(await this.isValidPassword(password, admin.password))) {
      throw new AuthenticationFailedException(
        '어드민 로그인에 실패하였습니다.',
      );
    }

    return admin;
  }

  private async isValidPassword(
    password: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    return await this.bcryptPort.compare(password, encryptedPassword);
  }

  private async generateAccessToken(adminId: string): Promise<AuthToken> {
    return await this.tokenUsecase.getJwtAccessToken({ id: adminId });
  }

  private async generateRefreshToken(adminId: string): Promise<AuthToken> {
    return await this.tokenUsecase.getJwtRefreshToken({ id: adminId });
  }
}
