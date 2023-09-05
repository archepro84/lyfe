import {
  AuthVerificationResponseCommand,
  SignInCommand,
} from '@application/port/in/auth/command/auth.command';
import { User } from '@domain/user/user';

export interface SignInUsecase {
  exec(
    signInCommand: SignInCommand,
  ): Promise<AuthVerificationResponseCommand<User>>;
}

export const SIGN_IN_USECASE = Symbol('SignInUsecase');
