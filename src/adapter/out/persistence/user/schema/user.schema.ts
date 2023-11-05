import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Geometry } from '@domain/user/geometry';
import { Document } from 'mongoose';
import { AuthToken } from '@domain/user/auth-token';
import { UserInfo } from '@domain/user/user-info';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserInfoEntity } from '@adapter/out/persistence/user/schema/user-info.schema';
import { GeometryEntity } from '@adapter/out/persistence/user/schema/geometry.schema';

export class UserEntity extends Document {
  _id: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: '유저의 닉네임',
    example: 'lyLY',
  })
  @IsString()
  nickname: string;

  @ApiProperty({
    required: true,
    type: () => UserInfoEntity,
    description: '유저의 정보',
  })
  userInfo: UserInfoEntity;

  @ApiProperty({
    required: true,
    type: 'string',
    example: '+8201017778484',
    description: '유저의 핸드폰 번호',
  })
  @IsString()
  phoneNumber: string;

  createdAt: Date;

  updatedAt: Date;

  @ApiProperty({
    required: true,
    type: () => GeometryEntity,
    description: '유저의 위치 정보',
  })
  location?: GeometryEntity;

  locationUpdatedAt?: Date;

  verifiedAt?: Date;

  authToken?: AuthToken;

  deletedAt?: Date;

  constructor(
    _id: string,
    nickname: string,
    userInfo: UserInfoEntity,
    phoneNumber: string,
    createdAt: Date,
    updatedAt: Date,
    location: GeometryEntity = null,
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

  @Prop()
  verifiedAt: Date;

  @Prop({ type: AuthToken, select: true })
  authToken: AuthToken;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ required: true, default: Date.now })
  updatedAt: Date;

  @Prop({ select: false })
  deletedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserMongoSchema);
