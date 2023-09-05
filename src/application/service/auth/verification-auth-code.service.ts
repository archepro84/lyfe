import { AuthRepository } from '@application/port/out/auth/auth.repository';
import { VerificationAuthCodeUsecase } from '@application/port/in/auth/verification-auth-code.usecase';
import { InvalidVerificationCodeException } from '@application/service/auth/exception/invalid-verification-code.exception';
import { AuthSendLogRepository } from '@application/port/out/auth/auth-send-log.repository';
import { VerificationCodeExpiredException } from '@application/service/auth/exception/verification-code-expired.exception';
import { BcryptPort } from '@application/port/security/bcrypt/bcrypt.port';
import { UserRepository } from '@application/port/out/user/user.repository';
import { AuthSendLog } from '@domain/auth/auth-send-log';
import { TokenUsecase } from '@application/port/in/auth/token/token.usecase';
import { AuthVerificationResponseCommand } from '@application/port/in/auth/command/auth.command';
import { SignInUsecase } from '@application/port/in/auth/sign-in.usecase';
import { User } from '@domain/user/user';

const EXPIRED_MINUTES = 1880;

export class VerificationAuthCodeService
  implements VerificationAuthCodeUsecase
{
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly authSendLogRepository: AuthSendLogRepository,
    private readonly userRepository: UserRepository,
    private readonly bcryptPort: BcryptPort,
    private readonly tokenUsecase: TokenUsecase<User>,
    private readonly signInUsecase: SignInUsecase,
  ) {}

  async verifyAuthCode(
    phoneNumber: string,
    authCode: string,
  ): Promise<AuthVerificationResponseCommand<User> | null> {
    const auth = await this.authRepository.getAuth(phoneNumber);
    const latestAuthSendLog =
      await this.authSendLogRepository.getLatestAuthSendLog(phoneNumber);

    if (this.isExpiredAuthCode(latestAuthSendLog))
      throw new VerificationCodeExpiredException();

    if (!(await this.bcryptPort.compare(authCode, auth.authCode)))
      throw new InvalidVerificationCodeException();

    // FIXME: 인증 최대 갯수를 5개로 설정하는 로직 추가
    await this.authRepository.verifyAuth(phoneNumber);

    const user = await this.userRepository.getUserByPhoneNumber(phoneNumber);
    if (!user) return null;

    return await this.signInUsecase.exec({
      phoneNumber: phoneNumber,
    });
  }

  private isExpiredAuthCode(authSendLog: AuthSendLog): boolean {
    return (
      authSendLog.sentAt <
      new Date(new Date().setMinutes(new Date().getMinutes() - EXPIRED_MINUTES))
    );
  }
}
