import { SignInUsecase } from '@application/port/in/auth/sign-in.usecase';
import { UserRepository } from '@application/port/out/user/user.repository';
import { NotFoundException } from '@common/exception/not-found.exception';
import {
  AuthVerificationResponseCommand,
  SignInCommand,
} from '@application/port/in/auth/command/auth.command';
import { TokenUsecase } from '@application/port/in/auth/token/token.usecase';
import { User } from '@domain/user/user';

export class SignInService implements SignInUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenUsecase: TokenUsecase,
  ) {}

  async signIn(
    signInCommand: SignInCommand,
  ): Promise<AuthVerificationResponseCommand<User>> {
    const user = await this.userRepository.getUserByPhoneNumber(
      signInCommand.phoneNumber,
    );
    if (!user)
      throw new NotFoundException('해당하는 사용자가 존재하지 않습니다.');

    const refreshToken = await this.tokenUsecase.getJwtRefreshToken({
      userId: user.id,
    });
    const cookieWithRefreshToken =
      await this.tokenUsecase.parseCookieByJwtRefreshToken(refreshToken);

    user.setAuthToken(refreshToken);

    return new AuthVerificationResponseCommand(user, cookieWithRefreshToken);
  }
}
