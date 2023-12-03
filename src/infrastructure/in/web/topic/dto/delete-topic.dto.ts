import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteTopicDto {
  @ApiProperty({
    example: '649ce793f331996dcc3cddab',
    description: '게시글 기본키',
  })
  @IsString()
  id: string;
}
