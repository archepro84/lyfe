import { AuthVerificationResponseCommand } from '@application/port/in/auth/command/auth.command';

export interface VerificationAuthCodeUsecase {
  verifyAuthCode(
    phoneNumber: string,
    authCode: string,
  ): Promise<AuthVerificationResponseCommand | null>;
}

export const VERIFICATION_AUTH_CODE_USECASE = Symbol(
  'VerificationAuthCodeUsecase',
);
