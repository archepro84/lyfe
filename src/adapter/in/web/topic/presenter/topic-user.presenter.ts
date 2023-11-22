import { ApiProperty, PickType } from '@nestjs/swagger';
import { TopicUserEntity } from '@adapter/out/persistence/topic/schema/topic-user.schema';

export class TopicUserPresenter extends PickType(TopicUserEntity, [
  'nickname',
]) {
  @ApiProperty({
    example: '649ce895f331996dcc3cddb6',
    description: 'id',
  })
  id?: string;
}
