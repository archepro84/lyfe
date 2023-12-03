import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuthToken } from '@domain/user/auth-token';

export class AdminEntity extends Document {
  _id?: string;

  email: string;

  password: string;

  createdAt: Date;

  updatedAt: Date;

  authToken?: AuthToken;

  constructor(
    _id: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    authToken: AuthToken = null,
  ) {
    super();

    this._id = _id;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.authToken = authToken;
  }
}

@Schema()
export class AdminMongoSchema {
  @Prop({ type: String, unique: true, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: AuthToken, select: true })
  authToken: AuthToken;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const AdminSchema = SchemaFactory.createForClass(AdminMongoSchema);
