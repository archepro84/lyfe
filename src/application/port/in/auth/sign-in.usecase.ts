import {
  AuthVerificationResponseCommand,
  SignInCommand,
} from '@application/port/in/auth/command/auth.command';

export interface SignInUsecase {
  signIn(
    signInCommand: SignInCommand,
  ): Promise<AuthVerificationResponseCommand>;
}

export const SIGN_IN_USECASE = Symbol('SignInUsecase');
