export class AdminIssueInvitationCommand {
  constructor(readonly adminId: string, readonly inviteePhoneNumber?: string) {}
}
