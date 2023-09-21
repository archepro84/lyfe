import { Invitation, InvitationStatus } from '@domain/auth/invitation';
import { RepositoryPort } from '@application/port/out/repository.port';

export interface InvitationRepository extends RepositoryPort<Invitation> {
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
