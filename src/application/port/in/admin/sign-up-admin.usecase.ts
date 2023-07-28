import { SignUpAdminCommand } from '@application/port/in/admin/command/sign-up-admin.command';
import { Admin } from '@domain/admin/admin';

export interface SignUpAdminUsecase {
  exec(signUpAdminCommand: SignUpAdminCommand): Promise<Admin>;
}

export const SIGN_UP_ADMIN_USECASE = Symbol('SignUpAdminUsecase');
