import { IssueInvitationUsecase } from '@application/port/in/auth/invitation/issue-invitation.usecase';
import { IssueInvitationCommand } from '@application/port/in/auth/invitation/command/issue-invitation.command';
import { Invitation } from '@domain/auth/invitation';
import { InvitationRepository } from '@application/port/out/auth/invitation/invitation.repository';
import { LoggerPort } from '@application/port/common/logger/logger.port';

export class IssueInvitationService implements IssueInvitationUsecase {
  constructor(
    private readonly logger: LoggerPort,
    private readonly invitationRepository: InvitationRepository,
  ) {}

  async exec(
    issueInvitationCommand: IssueInvitationCommand,
  ): Promise<Invitation> {
    const invitationCode = this.createInvitationCode();
    this.logger.debug(this.constructor.name, invitationCode);

    return await this.invitationRepository.issueInvitation(
      new Invitation(
        issueInvitationCommand.invitationType,
        issueInvitationCommand.inviterId,
        invitationCode,
        issueInvitationCommand.inviteePhoneNumber,
      ),
    );
  }

  // 숫자, 영문로 이루어진 6자리 문자열 생성
  createInvitationCode(): string {
    const invitationCodeLength = 6;
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    return Array.from({ length: invitationCodeLength })
      .map(() => charset.charAt(Math.floor(Math.random() * charset.length)))
      .join('');
  }
}
