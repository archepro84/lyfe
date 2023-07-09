export interface SendVerificationUsecase {
  sendVerification(phoneNumber: string, authCode?: string): Promise<void>;
}

export const SEND_VERIFICATION_USECASE = Symbol('SendVerificationUsecase');
