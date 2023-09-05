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
import { Invitation, InvitationStatus } from '@domain/auth/invitation';
import { Auth } from '@domain/auth/auth';

export class SignUpService implements SignUpUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authRepository: AuthRepository,
    private readonly invitationRepository: InvitationRepository,
    private readonly tokenUsecase: TokenUsecase,
    private readonly signInUsecase: SignInUsecase,
  ) {}

  async exec(
    signUpCommand: SignUpCommand,
  ): Promise<AuthVerificationResponseCommand<User>> {
    const invitation = await this.validateInvitation(
      signUpCommand.invitationCode,
    );
    await this.validateAuth(signUpCommand.phoneNumber);
    await this.validateUserExistence(signUpCommand.phoneNumber);

    invitation.setInvitationStatus(InvitationStatus.ACCEPTED);

    // TODO: 트랜잭션 도입
    await this.userRepository.userSignUp(signUpCommand);
    await this.invitationRepository.updateInvitationStatus(
      invitation.id,
      invitation.getInvitationStatus(),
    );

    return await this.signInUsecase.exec({
      phoneNumber: signUpCommand.phoneNumber,
    });
  }

  private async validateInvitation(
    invitationCode: string,
  ): Promise<Invitation> {
    const invitation =
      await this.invitationRepository.getInvitationByInvitationCode(
        invitationCode,
      );
    if (!invitation)
      throw new NotFoundException('초대코드가 일치하지 않습니다.');

    return invitation;
  }

  private async validateAuth(phoneNumber: string): Promise<Auth> {
    const auth = await this.authRepository.getAuth(phoneNumber);
    if (!auth || auth.verified === false) throw new UserNotVerifiedException();

    return auth;
  }

  private async validateUserExistence(phoneNumber: string): Promise<User> {
    const user = await this.userRepository.getUserByPhoneNumber(phoneNumber);
    if (user) throw new UserAlreadyExistsException();

    return user;
  }
}
