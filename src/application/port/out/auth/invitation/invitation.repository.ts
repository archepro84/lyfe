import { Invitation } from '@domain/auth/invitation';

export interface InvitationRepository {
  getInvitation(inviteePhoneNumber: string): Promise<Invitation | null>;

  getInvitationByInvitationCode(
    invitationCode: string,
  ): Promise<Invitation | null>;

  issueInvitation(invitation: Invitation): Promise<Invitation>;

  updateInvitation(invitation: Invitation): Promise<void>;
}
