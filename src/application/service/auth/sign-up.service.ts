import { UserRepository } from '@application/port/out/user/user.repository';
import { UserAlreadyExistsException } from 'src/application/service/auth/exception/user-already-exists.exception';
import { AuthRepository } from '@application/port/out/auth/auth.repository';
import { UserNotVerifiedException } from '@application/service/auth/exception/user-not-verified.exception';
import { SignUpUsecase } from '@application/port/in/auth/sign-up.usecase';
import {
  AuthVerificationResponseCommand,
  SignUpCommand,
} from '@application/port/in/auth/command/auth.command';
import { TokenUsecase } from '@application/port/in/auth/token/token.usecase';
import { SignInUsecase } from '@application/port/in/auth/sign-in.usecase';
import { User } from '@domain/user/user';
import { InvitationRepository } from '@application/port/out/auth/invitation/invitation.repository';
import { NotFoundException } from '@common/exception/not-found.exception';
import { InvitationStatus } from '@domain/auth/invitation';

export class SignUpService implements SignUpUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authRepository: AuthRepository,
    private readonly invitationRepository: InvitationRepository,
    private readonly tokenUsecase: TokenUsecase,
    private readonly signInUsecase: SignInUsecase,
  ) {}

  async signUp(
    signUpCommand: SignUpCommand,
  ): Promise<AuthVerificationResponseCommand<User>> {
    const invitation =
      await this.invitationRepository.getInvitationByInvitationCode(
        signUpCommand.invitationCode,
      );
    if (!invitation)
      throw new NotFoundException('초대코드가 일치하지 않습니다.');

    const auth = await this.authRepository.getAuth(signUpCommand.phoneNumber);
    if (auth.verified === false) throw new UserNotVerifiedException();

    const user = await this.userRepository.getUserByPhoneNumber(
      signUpCommand.phoneNumber,
    );
    if (user) throw new UserAlreadyExistsException();

    invitation.setInvitationStatus(InvitationStatus.ACCEPTED);
    // TODO: 트랜잭션 도입
    await this.userRepository.userSignUp(signUpCommand);
    await this.invitationRepository.updateInvitation(invitation);

    return await this.signInUsecase.signIn({
      phoneNumber: signUpCommand.phoneNumber,
    });
  }
}
