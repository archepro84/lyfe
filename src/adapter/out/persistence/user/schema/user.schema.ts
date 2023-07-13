import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Geometry } from '@domain/user/geometry';
import { Document } from 'mongoose';
import { AuthToken } from '@domain/user/auth-token';

export class UserEntity extends Document {
  _id: string;

  nickname: string;

  phoneNumber: string;

  location?: Geometry;

  locationUpdatedAt?: Date;

  verifiedAt?: Date;

  authToken?: AuthToken;

  createdAt: Date;

  updatedAt: Date;

  constructor(
    _id: string,
    nickname: string,
    phoneNumber: string,
    location: Geometry = null,
    locationUpdatedAt = null,
    verifiedAt: Date = null,
    authToken: AuthToken = null,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super();

    this._id = _id;
    this.nickname = nickname;
    this.phoneNumber = phoneNumber;
    this.location = location;
    this.locationUpdatedAt = locationUpdatedAt;
    this.verifiedAt = verifiedAt;
    this.authToken = authToken;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

@Schema()
export class UserMongoSchema {
  @Prop({ required: true, unique: true })
  nickname: string;

  @Prop({ required: true, unique: true })
  phoneNumber: string;

  @Prop()
  location: Geometry;

  @Prop()
  locationUpdatedAt: Date;

  @Prop({ select: false })
  verified: Date;

  @Prop({ select: true })
  authToken: AuthToken;

  @Prop({ required: true, default: Date.now, select: false })
  createdAt: Date;

  @Prop({ required: true, default: Date.now })
  updatedAt: Date;

  @Prop({ select: false })
  deletedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserMongoSchema);
