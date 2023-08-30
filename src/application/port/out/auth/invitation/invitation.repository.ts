import { Invitation, InvitationStatus } from '@domain/auth/invitation';

export interface InvitationRepository {
  getInvitation(inviteePhoneNumber: string): Promise<Invitation | null>;

  getInvitationByInvitationCode(
    invitationCode: string,
  ): Promise<Invitation | null>;

  issueInvitation(invitation: Invitation): Promise<Invitation>;

  updateInvitationStatus(
    invitationId: string,
    invitationStatus: InvitationStatus,
  ): Promise<void>;
}
