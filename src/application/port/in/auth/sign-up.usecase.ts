import {
  AuthVerificationResponseCommand,
  SignUpCommand,
} from '@application/port/in/auth/command/auth.command';

export interface SignUpUsecase {
  signUp(
    signUpCommand: SignUpCommand,
  ): Promise<AuthVerificationResponseCommand>;
}

export const SIGN_UP_USECASE = Symbol('SignUpUsecase');
