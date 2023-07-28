import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { InvitationStatus, InvitationType } from '@domain/auth/invitation';

export class InvitationEntity extends Document {
  id?: string;

  invitationType: InvitationType;

  inviterId: string;

  invitationCode: string;

  inviteePhoneNumber: string;

  invitationStatus: InvitationStatus;

  constructor(
    id: string,
    invitationType: InvitationType,
    inviterId: string,
    invitationCode: string,
    inviteePhoneNumber: string,
    invitationStatus: InvitationStatus,
  ) {
    super();

    this.id = null;
    this.invitationType = invitationType;
    this.inviterId = inviterId;
    this.invitationCode = invitationCode;
    this.inviteePhoneNumber = inviteePhoneNumber;
    this.invitationStatus = invitationStatus;
  }
}

@Schema()
export class InvitationMongoSchema {
  @Prop({ type: String, enum: Object.values(InvitationType), required: true })
  invitationType: InvitationType;

  @Prop({ type: Types.ObjectId, required: true })
  inviterId: string;

  @Prop({ type: String, required: true })
  invitationCode: string;

  @Prop({ type: String, required: true })
  inviteePhoneNumber: string;

  @Prop({
    type: String,
    enum: Object.values(InvitationStatus),
    default: InvitationStatus.PENDING,
    required: true,
  })
  invitationStatus: InvitationStatus;
}

export const InvitationSchema = SchemaFactory.createForClass(
  InvitationMongoSchema,
);
