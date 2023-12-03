import { AdminRepository } from '@application/port/out/admin/admin.repository';
import { SignUpAdminUsecase } from '@application/port/in/admin/sign-up-admin.usecase';
import { BcryptPort } from '@application/port/common/bcrypt/bcrypt.port';
import { SignUpAdminCommand } from '@application/port/in/admin/command/sign-up-admin.command';
import { Admin } from '@domain/admin/admin';

export class SignUpAdminService implements SignUpAdminUsecase {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly bcryptPort: BcryptPort,
  ) {}

  async exec(signUpAdminCommand: SignUpAdminCommand): Promise<Admin> {
    const { password, email } = signUpAdminCommand;
    const hashedPassword = await this.bcryptPort.hash(password);

    return await this.adminRepository.signUpAdmin(
      new Admin(null, email, hashedPassword),
    );
  }
}
