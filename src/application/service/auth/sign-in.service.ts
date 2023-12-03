import { SignInUsecase } from '@application/port/in/auth/sign-in.usecase';
import { UserRepository } from '@application/port/out/user/user.repository';
import { NotFoundException } from '@domain/common/exception/not-found.exception';
import {
  AuthVerificationResponseCommand,
  SignInCommand,
} from '@application/port/in/auth/command/auth.command';
import { TokenUsecase } from '@application/port/in/auth/token/token.usecase';
import { User } from '@domain/user/user';
import { AuthToken } from '@domain/user/auth-token';

export class SignInService<T> implements SignInUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenUsecase: TokenUsecase<T>,
  ) {}

  async exec(
    signInCommand: SignInCommand,
  ): Promise<AuthVerificationResponseCommand<User>> {
    const user = await this.verifyUser(signInCommand.phoneNumber);

    const accessToken = await this.generateAccessToken(user.id);
    const refreshToken = await this.generateRefreshToken(user.id);

    user.setAuthToken(refreshToken);

    return new AuthVerificationResponseCommand(user, accessToken, refreshToken);
  }

  private async verifyUser(phoneNumber: string): Promise<User> {
    const user = await this.userRepository.getUserByPhoneNumber(phoneNumber);
    if (!user)
      throw new NotFoundException('해당하는 사용자가 존재하지 않습니다.');

    return user;
  }

  private async generateAccessToken(adminId: string): Promise<AuthToken> {
    return await this.tokenUsecase.getJwtAccessToken({ id: adminId });
  }

  private async generateRefreshToken(adminId: string): Promise<AuthToken> {
    return await this.tokenUsecase.getJwtRefreshToken({ id: adminId });
  }
}
