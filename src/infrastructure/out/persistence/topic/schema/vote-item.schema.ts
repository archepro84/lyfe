import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export class VoteItemEntity extends Document {
  _id?: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: '투표 항목',
    example: '투표 항목 1번',
  })
  @IsString()
  title: string;

  @ApiProperty({
    required: true,
    type: 'number',
    description: '투표 항목의 순서',
    example: 2,
  })
  @IsNumber()
  index: number;
}

@Schema({ _id: true })
export class VoteItemMongoSchema {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  index: number;
}

export const VoteItemSchema = SchemaFactory.createForClass(VoteItemMongoSchema);
