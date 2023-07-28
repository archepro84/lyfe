import { Admin } from '@domain/admin/admin';
import { SignInAdminCommand } from '@application/port/in/admin/command/sign-in-admin.command';
import { AuthVerificationResponseCommand } from '@application/port/in/auth/command/auth.command';

export interface SignInAdminUsecase {
  exec(
    signInAdminCommand: SignInAdminCommand,
  ): Promise<AuthVerificationResponseCommand<Admin>>;
}

export const SIGN_IN_ADMIN_USECASE = Symbol('SignInAdminUsecase');
