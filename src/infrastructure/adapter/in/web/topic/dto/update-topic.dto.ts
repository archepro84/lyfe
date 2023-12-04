import { ApiProperty, OmitType } from '@nestjs/swagger';
import { TopicEntity } from '@infrastructure/adapter/out/persistence/topic/schema/topic.schema';
import { IsString } from 'class-validator';

export class UpdateTopicDto extends OmitType(TopicEntity, [
  'theme',
  'user',
  'vote',
]) {
  @ApiProperty({
    example: '649ce793f331996dcc3cddab',
    description: '게시글 기본키',
  })
  @IsString()
  id: string;
}
