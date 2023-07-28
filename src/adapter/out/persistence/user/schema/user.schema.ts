import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Geometry } from '@domain/user/geometry';
import { Document } from 'mongoose';
import { AuthToken } from '@domain/user/auth-token';
import { UserInfo } from '@domain/user/user-info';

export class UserEntity extends Document {
  _id: string;

  nickname: string;

  userInfo: UserInfo;

  phoneNumber: string;

  createdAt: Date;

  updatedAt: Date;

  location?: Geometry;

  locationUpdatedAt?: Date;

  verifiedAt?: Date;

  authToken?: AuthToken;

  deletedAt?: Date;

  constructor(
    _id: string,
    nickname: string,
    userInfo: UserInfo,
    phoneNumber: string,
    createdAt: Date,
    updatedAt: Date,
    location: Geometry = null,
    locationUpdatedAt = null,
    verifiedAt: Date = null,
    authToken: AuthToken = null,
    deletedAt: Date = null,
  ) {
    super();

    this._id = _id;
    this.nickname = nickname;
    this.userInfo = userInfo;
    this.phoneNumber = phoneNumber;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

    this.location = location;
    this.locationUpdatedAt = locationUpdatedAt;
    this.verifiedAt = verifiedAt;
    this.authToken = authToken;
    this.deletedAt = deletedAt;
  }
}

@Schema()
export class UserMongoSchema {
  @Prop({ required: true, unique: true })
  nickname: string;

  @Prop({ required: true, unique: true })
  userInfo: UserInfo;

  @Prop({ required: true, unique: true })
  phoneNumber: string;

  @Prop()
  location: Geometry;

  @Prop()
  locationUpdatedAt: Date;

  @Prop({ select: false })
  verified: Date;

  @Prop({ type: AuthToken, select: true })
  authToken: AuthToken;

  @Prop({ required: true, default: Date.now, select: false })
  createdAt: Date;

  @Prop({ required: true, default: Date.now })
  updatedAt: Date;

  @Prop({ select: false })
  deletedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserMongoSchema);
