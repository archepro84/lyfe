import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Document } from 'mongoose';
import { VoteType } from '@domain/topic/vote/vote';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  VoteItemEntity,
  VoteItemMongoSchema,
  VoteItemSchema,
} from '@adapter/out/persistence/topic/schema/vote-item.schema';

export class VoteEntity extends Document {
  _id?: string;

  @ApiProperty({
    required: true,
    type: () => [VoteItemEntity],
    description: '투표 항목',
  })
  voteItem: VoteItemEntity[];

  @ApiProperty({
    required: true,
    enum: VoteType,
    description: '투표 타입',
    example: VoteType.SINGLE,
  })
  @IsEnum(VoteType)
  voteType: VoteType;

  createdAt?: Date;

  updatedAt?: Date;
}

@Schema({ _id: true })
export class VoteMongoSchema {
  @Prop({ required: true, _id: true, type: [VoteItemSchema] })
  voteItem: VoteItemMongoSchema[];

  @Prop({ required: true })
  voteType: VoteType;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ required: true, default: Date.now })
  updatedAt: Date;
}

export const VoteSchema = SchemaFactory.createForClass(VoteMongoSchema);
