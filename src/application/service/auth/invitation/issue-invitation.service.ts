import { IssueInvitationUsecase } from '@application/port/in/auth/invitation/issue-invitation.usecase';
import { IssueInvitationCommand } from '@application/port/in/auth/invitation/command/issue-invitation.command';
import { Invitation } from '@domain/auth/invitation';
import { InvitationRepository } from '@application/port/out/auth/invitation/invitation.repository';
import { BcryptPort } from '@application/port/security/bcrypt/bcrypt.port';
import { LoggerPort } from '@application/port/common/logger/logger.port';

export class IssueInvitationService implements IssueInvitationUsecase {
  constructor(
    private readonly logger: LoggerPort,
    private readonly invitationRepository: InvitationRepository,
    private readonly bcryptPort: BcryptPort,
  ) {}

  async exec(
    issueInvitationCommand: IssueInvitationCommand,
  ): Promise<Invitation> {
    const invitationCode = this.createInvitationCode();
    this.logger.debug(this.constructor.name, invitationCode);

    const hashedInvitationCode = await this.bcryptPort.hash(invitationCode);

    return await this.invitationRepository.issueInvitation(
      new Invitation(
        issueInvitationCommand.invitationType,
        issueInvitationCommand.inviterId,
        hashedInvitationCode,
        issueInvitationCommand.inviteePhoneNumber,
      ),
    );
  }

  // 8자리의 숫자로 구성된 InvitationCode를 반환한다.
  createInvitationCode(): string {
    const invitationCode = Math.floor(Math.random() * 89999999) + 10000000;
    return invitationCode.toString();
  }
}
