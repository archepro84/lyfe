import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { Theme } from '@domain/topic/topic';
import { UserEntity } from '@adapter/out/persistence/user/schema/user.schema';
import { ImageEntity } from '@adapter/out/persistence/topic/schema/image.schema';
import { Document } from 'mongoose';
import { GeometryEntity } from '@adapter/out/persistence/user/schema/geometry.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { VoteEntity } from '@adapter/out/persistence/topic/schema/vote.schema';

export class TopicEntity extends Document {
  _id?: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: '게시글 제목',
    example: '새로운 게시글입니다.',
  })
  @IsString()
  title: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: '게시글 내용',
    example: '게시글 내용 입니다.',
  })
  @IsString()
  content: string;

  @ApiProperty({
    required: true,
    enum: Theme,
    description: '게시글 테마',
  })
  @IsEnum(Theme)
  theme: Theme;

  @ApiProperty({
    required: true,
    type: () => UserEntity,
    description: '게시글 테마',
  })
  user: UserEntity;

  @ApiProperty({
    required: true,
    isArray: true,
    type: () => ImageEntity,
    description: '이미지 URL',
  })
  @IsArray()
  @IsOptional()
  images?: ImageEntity[];

  @ApiProperty({
    required: true,
    type: () => GeometryEntity,
    description: '게시글 위치 정보',
  })
  @IsOptional()
  geometry?: GeometryEntity;

  @ApiProperty({
    required: true,
    type: () => VoteEntity,
    description: '게시글 투표',
  })
  @IsOptional()
  vote?: VoteEntity;

  viewCount?: number;

  likeCount?: number;

  commentCount?: number;

  createdAt?: Date;

  updatedAt?: Date;

  deletedAt?: Date;
}

@Schema({ collection: 'topics', _id: false })
export class TopicMongoSchema {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  theme: Theme;

  @Prop({ required: true })
  user: UserEntity;

  @Prop()
  images?: ImageEntity[];

  @Prop()
  geometry?: GeometryEntity;

  @Prop()
  vote?: VoteEntity;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ required: true, default: Date.now })
  updatedAt: Date;

  @Prop({ select: false })
  deletedAt?: Date;
}

export const TopicSchema = SchemaFactory.createForClass(TopicMongoSchema);
