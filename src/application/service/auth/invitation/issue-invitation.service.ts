import { IssueInvitationUsecase } from '@application/port/in/auth/invitation/issue-invitation.usecase';
import { IssueInvitationCommand } from '@application/port/in/auth/invitation/command/issue-invitation.command';
import { Invitation } from '@domain/auth/invitation';
import { InvitationRepository } from '@application/port/out/auth/invitation/invitation.repository';
import { LoggerPort } from '@application/port/common/logger/logger.port';
import { InvitationCodeCreationFailedException } from '@application/service/auth/invitation/exception/invitation-code-creation-failed.exception';

const MAX_LOOP_COUNT = 3;
const INVITATION_CODE_LENGTH = 6;
const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export class IssueInvitationService implements IssueInvitationUsecase {
  constructor(
    private readonly logger: LoggerPort,
    private readonly invitationRepository: InvitationRepository,
  ) {}

  async exec(
    issueInvitationCommand: IssueInvitationCommand,
  ): Promise<Invitation> {
    const invitationCode = await this.generateUniqueInvitationCode();
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
  generateInvitationCode(): string {
    return Array.from({ length: INVITATION_CODE_LENGTH })
      .map(() => CHARSET.charAt(Math.floor(Math.random() * CHARSET.length)))
      .join('');
  }

  private async generateUniqueInvitationCode(): Promise<string> {
    let attempts = 0;
    while (attempts < MAX_LOOP_COUNT) {
      attempts++;
      const invitationCode = this.generateInvitationCode();
      const invitation =
        await this.invitationRepository.getInvitationByInvitationCode(
          invitationCode,
        );
      if (!invitation) return invitationCode;
    }

    throw new InvitationCodeCreationFailedException();
  }
}
