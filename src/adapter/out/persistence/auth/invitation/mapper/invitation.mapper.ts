import { Invitation } from '@domain/auth/invitation';
import { InvitationEntity } from '@adapter/out/persistence/auth/invitation/schema/invitation.schema';

export class InvitationMapper {
  public static toDomain(invitationEntity: InvitationEntity): Invitation {
    if (!invitationEntity) return null;

    const invitation = new Invitation(
      invitationEntity.invitationType,
      invitationEntity.inviterId,
      invitationEntity.invitationCode,
      invitationEntity.inviteePhoneNumber,
    );

    invitation.id = invitationEntity.id;
    invitation.setInvitationStatus(invitationEntity.invitationStatus);

    return invitation;
  }

  public static toPersistence(invitation: Invitation): InvitationEntity {
    const invitationEntity = new InvitationEntity(
      invitation.id,
      invitation.invitationType,
      invitation.inviterId,
      invitation.invitationCode,
      invitation.inviteePhoneNumber,
      invitation.getInvitationStatus(),
    );

    return invitationEntity;
  }
}
