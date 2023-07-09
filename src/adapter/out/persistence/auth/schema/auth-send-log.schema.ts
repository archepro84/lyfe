import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export class AuthSendLogEntity extends Document {
  id?: string;

  authId: string;

  phoneNumber: string;

  sentAt: Date;

  constructor(id: string, authId: string, phoneNumber: string, sentAt: Date) {
    super();

    this.id = id;
    this.authId = authId;
    this.phoneNumber = phoneNumber;
    this.sentAt = sentAt;
  }
}

@Schema()
export class AuthSendLogMongoSchema {
  @Prop({ type: Types.ObjectId, ref: 'Auth' })
  auth: string;

  @Prop({ type: String, required: true })
  phoneNumber: string;

  @Prop({ type: Date, default: Date.now })
  sentAt: Date;
}

export const AuthSendLogSchema = SchemaFactory.createForClass(
  AuthSendLogMongoSchema,
);
