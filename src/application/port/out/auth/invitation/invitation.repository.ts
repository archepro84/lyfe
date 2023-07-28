import { Invitation } from '@domain/auth/invitation';

export interface InvitationRepository {
  getInvitation(inviteePhoneNumber: string): Promise<Invitation | null>;

  issueInvitation(invitation: Invitation): Promise<Invitation>;
}
