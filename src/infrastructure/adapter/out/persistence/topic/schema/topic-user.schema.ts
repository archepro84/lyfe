import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TopicUserEntity {
  @ApiProperty({
    example: '649ce793f331996dcc3cddab',
    description: '사용자 id',
  })
  @IsString()
  _id: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: '유저의 닉네임',
    example: 'lyLY',
  })
  @IsString()
  nickname: string;

  // TODO: Badge 추가
}
