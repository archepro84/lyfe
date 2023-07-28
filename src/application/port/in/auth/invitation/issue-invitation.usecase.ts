import { IssueInvitationCommand } from '@application/port/in/auth/invitation/command/issue-invitation.command';
import { Invitation } from '@domain/auth/invitation';

export interface IssueInvitationUsecase {
  exec(issueInvitationCommand: IssueInvitationCommand): Promise<Invitation>;
}

export const ISSUE_INVITATION_USECASE = Symbol('IssueInvitationUsecase');
