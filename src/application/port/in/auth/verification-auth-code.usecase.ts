import { AuthVerificationResponseCommand } from '@application/port/in/auth/command/auth.command';
import { User } from '@domain/user/user';

export interface VerificationAuthCodeUsecase {
  verifyAuthCode(
    phoneNumber: string,
    authCode: string,
  ): Promise<AuthVerificationResponseCommand<User> | null>;
}

export const VERIFICATION_AUTH_CODE_USECASE = Symbol(
  'VerificationAuthCodeUsecase',
);
