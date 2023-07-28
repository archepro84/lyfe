import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvitationRepository } from '@application/port/out/auth/invitation/invitation.repository';
import { Invitation } from '@domain/auth/invitation';
import { InvitationEntity } from '@adapter/out/persistence/auth/invitation/schema/invitation.schema';
import { InvitationMapper } from '@adapter/out/persistence/auth/invitation/mapper/invitation.mapper';

@Injectable()
export class InvitationMongoRepository implements InvitationRepository {
  constructor(
    @InjectModel('Invitation')
    private readonly invitationModel: Model<InvitationEntity>,
  ) {}

  async getInvitation(inviteePhoneNumber: string): Promise<Invitation | null> {
    const invitation = await this.invitationModel
      .findOne({
        inviteePhoneNumber,
      })
      .exec();

    return InvitationMapper.toDomain(invitation);
  }

  async issueInvitation(invitation: Invitation): Promise<Invitation> {
    return InvitationMapper.toDomain(
      await this.invitationModel.create({
        ...invitation,
      }),
    );
  }
}
