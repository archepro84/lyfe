import { Invitation } from '@domain/auth/invitation';
import { AdminIssueInvitationCommand } from '@application/port/in/admin/command/admin-issue-invitation.command';

export interface AdminIssueInvitationUsecase {
  exec(
    adminIssueInvitationCommand: AdminIssueInvitationCommand,
  ): Promise<Invitation>;
}

export const ADMIN_ISSUE_INVITATION_USECASE = Symbol(
  'AdminIssueInvitationUsecase',
);
