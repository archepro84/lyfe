import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export class AuthEntity extends Document {
  id?: string;

  phoneNumber: string;

  authCode: string;

  createdAt: Date;

  verified?: boolean;

  verifiedAt?: Date;

  constructor(
    id: string,
    phoneNumber: string,
    authCode: string,
    createdAt: Date,
    verified = false,
    verifiedAt: Date = null,
  ) {
    super();

    this.id = id;
    this.phoneNumber = phoneNumber;
    this.authCode = authCode;
    this.createdAt = createdAt;
    this.verified = verified;
    this.verifiedAt = verifiedAt;
  }
}

@Schema()
export class AuthMongoSchema {
  @Prop({ type: String, required: true })
  phoneNumber: string;

  @Prop({ type: String, required: true })
  authCode: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Boolean, default: false })
  verified?: boolean;

  @Prop({ type: Date })
  verifiedAt?: Date;

  @Prop({ type: Types.ObjectId, ref: 'AuthSendLog' })
  authSendLogs: string;
}

export const AuthSchema = SchemaFactory.createForClass(AuthMongoSchema);
