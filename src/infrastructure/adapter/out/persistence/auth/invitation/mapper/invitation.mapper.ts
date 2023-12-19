import { Invitation } from '@domain/auth/invitation';
import { InvitationEntity } from '@infrastructure/adapter/out/persistence/auth/invitation/schema/invitation.schema';
import { Injectable } from '@nestjs/common';
import { MapperPort } from '@application/port/out/mapper.port';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class InvitationMapper
  implements MapperPort<InvitationEntity, Invitation>
{
  constructor(
    @InjectModel(Invitation.name)
    private readonly model: Model<InvitationEntity>,
  ) {}

  public toDomain(invitationEntity: InvitationEntity): Invitation {
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

  public toDomains(invitationEntities: InvitationEntity[]): Invitation[] {
    return invitationEntities.map((invitationEntity) =>
      this.toDomain(invitationEntity),
    );
  }

  public toPersistence(invitation: Invitation): InvitationEntity {
    return new this.model({
      _id: new Types.ObjectId(invitation.id),
      invitationType: invitation.invitationType,
      inviterId: new Types.ObjectId(invitation.inviterId),
      invitationCode: invitation.invitationCode,
      inviteePhoneNumber: invitation.inviteePhoneNumber,
      invitationStatus: invitation.getInvitationStatus(),
    });
  }
}
