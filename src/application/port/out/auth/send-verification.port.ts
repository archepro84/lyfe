export interface SendVerificationPort {
  sendVerification(
    phoneNumber: string,
    verificationCode: string,
  ): Promise<void>;
}
