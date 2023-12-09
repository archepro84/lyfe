import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TopicUserEntity } from '@infrastructure/adapter/out/persistence/topic/schema/topic-user.schema';

export class CommentEntity extends Document {
  _id?: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: '게시글 id',
    example: '649ce793f331996dcc3cddab',
  })
  @IsString()
  topicId: string;

  @ApiProperty({
    required: true,
    type: () => TopicUserEntity,
    description: '게시글 작성자정보',
  })
  user: TopicUserEntity;

  @ApiProperty({
    required: true,
    type: 'string',
    description: '댓글 내용',
    example: '댓글 내용 입니다.',
  })
  @IsString()
  content: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: '부모 댓글 id',
    example: '649ce793f331996dcc3cddab',
  })
  @IsOptional()
  @IsString()
  patentId?: string;

  createdAt?: Date;

  updatedAt?: Date;

  deletedAt?: Date;
}

@Schema({ collection: 'comments', _id: true })
export class CommentMongoSchema {
  @Prop({ required: true, type: 'string' })
  topicId: string;

  @Prop({ required: true })
  user: TopicUserEntity;

  @Prop({ required: true })
  content: string;

  @Prop({ required: false })
  patent?: string;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ required: true, default: Date.now })
  updatedAt: Date;

  @Prop({ select: false })
  deletedAt?: Date;
}

export const CommentSchema = SchemaFactory.createForClass(CommentMongoSchema);
