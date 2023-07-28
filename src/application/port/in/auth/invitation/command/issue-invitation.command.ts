import { InvitationType } from '@domain/auth/invitation';

export class IssueInvitationCommand {
  constructor(
    readonly invitationType: InvitationType,
    readonly inviterId: string,
    readonly inviteePhoneNumber: string,
  ) {}
}
