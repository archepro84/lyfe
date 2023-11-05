import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Document } from 'mongoose';

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
    type: 'string',
    description: '투표 항목의 순서',
    example: 2,
  })
  @IsString()
  index: string;
}
