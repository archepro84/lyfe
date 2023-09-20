import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvitationRepository } from '@application/port/out/auth/invitation/invitation.repository';
import { Invitation, InvitationStatus } from '@domain/auth/invitation';
import { InvitationEntity } from '@adapter/out/persistence/auth/invitation/schema/invitation.schema';
import { InvitationMapper } from '@adapter/out/persistence/auth/invitation/mapper/invitation.mapper';
import { Repository } from '@adapter/out/persistence/repository';
import { transactionSessionStorage } from '@adapter/out/persistence/common/transaction/transaction.session.storage';

@Injectable()
export class InvitationMongoRepository
  extends Repository<InvitationEntity, Invitation>
  implements InvitationRepository
{
  constructor(
    @InjectModel('Invitation')
    private readonly invitationModel: Model<InvitationEntity>,
    private readonly invitationMapper: InvitationMapper,
  ) {
    super(invitationModel, invitationMapper, transactionSessionStorage);
  }

  async getInvitation(inviteePhoneNumber: string): Promise<Invitation | null> {
    const invitation = await this.invitationModel
      .findOne({
        inviteePhoneNumber,
      })
      .exec();

    return this.invitationMapper.toDomain(invitation);
  }

  async getInvitationByInvitationCode(
    invitationCode: string,
  ): Promise<Invitation | null> {
    const invitation = await this.invitationModel
      .findOne({
        invitationCode,
      })
      .exec();

    return this.invitationMapper.toDomain(invitation);
  }

  async issueInvitation(invitation: Invitation): Promise<Invitation> {
    const createdInvitation = await this.invitationModel.create(
      {
        ...invitation,
      },
      {
        session: this.getSession(),
      },
    );

    return this.invitationMapper.toDomains(createdInvitation)[0];
  }

  async updateInvitationStatus(
    invitationId: string,
    invitationStatus: InvitationStatus,
  ): Promise<void> {
    await this.invitationModel.updateOne(
      {
        _id: invitationId,
      },
      {
        invitationStatus,
      },
      {
        session: this.getSession(),
      },
    );
  }
}
