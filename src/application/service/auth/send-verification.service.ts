import { SendVerificationUsecase } from '@application/port/in/auth/send-verification.usecase';
import { SendVerificationPort } from '@application/port/out/auth/send-verification.port';
import { AuthRepository } from '@application/port/out/auth/auth.repository';
import { AuthSendLogRepository } from '@application/port/out/auth/auth-send-log.repository';
import { VerificationLimitExceededException } from '@application/service/auth/exception/verification-limit-exceeded.exception';
import { BcryptPort } from '@application/port/common/bcrypt/bcrypt.port';
import { LoggerPort } from '@application/port/common/logger/logger.port';

const VERIFICATION_LIMIT = 3;

export class SendVerificationService implements SendVerificationUsecase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly authSendLogRepository: AuthSendLogRepository,
    private readonly sendVerificationPort: SendVerificationPort,
    private readonly bcryptPort: BcryptPort,
    private readonly loggerPort: LoggerPort,
  ) {}

  async sendVerification(phoneNumber: string): Promise<void> {
    const authCode = SendVerificationService.getAuthCode();
    let auth = await this.authRepository.getAuth(phoneNumber);

    if (await this.isExceededVerificationLimit(phoneNumber))
      throw new VerificationLimitExceededException();

    const hashedAuthCode = await this.bcryptPort.hash(authCode);
    if (!auth) {
      auth = await this.authRepository.createAuth(phoneNumber, hashedAuthCode);
    } else {
      auth = await this.authRepository.updateAuthCode(
        phoneNumber,
        hashedAuthCode,
      );
    }

    await this.authSendLogRepository.createAuthSendLog(auth, phoneNumber);
    this.loggerPort.debug(
      'SendVerificationService',
      `phoneNumber: ${phoneNumber}, authCode: ${authCode}`,
    );

    return this.sendVerificationPort.sendVerification(phoneNumber, authCode);
  }

  static getAuthCode(): string {
    const authCode = Math.floor(Math.random() * 899999) + 100000;
    return authCode.toString();
  }

  // VERIFICATION_LIMIT을 초과한 횟수를 검증한다.
  private async isExceededVerificationLimit(
    phoneNumber: string,
  ): Promise<boolean> {
    return (
      (await this.authSendLogRepository.getAuthSendLogCount(phoneNumber)) >=
      VERIFICATION_LIMIT
    );
  }
}
