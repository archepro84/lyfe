import {
  AuthVerificationResponseCommand,
  SignUpCommand,
} from '@application/port/in/auth/command/auth.command';
import { User } from '@domain/user/user';

export interface SignUpUsecase {
  signUp(
    signUpCommand: SignUpCommand,
  ): Promise<AuthVerificationResponseCommand<User>>;
}

export const SIGN_UP_USECASE = Symbol('SignUpUsecase');
