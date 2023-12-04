import { ApiProperty, PickType } from '@nestjs/swagger';
import { TopicEntity } from '@infrastructure/adapter/out/persistence/topic/schema/topic.schema';
import { TopicUserPresenter } from '@infrastructure/adapter/in/web/topic/presenter/topic-user.presenter';
import { PaginatedPresenter } from '@infrastructure/common/swagger/presenter/paginated.presenter';

export class TopicPresenter extends PickType(TopicEntity, [
  'title',
  'content',
  'theme',
  'images',
]) {
  @ApiProperty({
    example: '649ce895f331996dcc3cddb6',
    description: 'id',
  })
  id?: string;

  @ApiProperty({ type: TopicUserPresenter })
  user: TopicUserPresenter;

  @ApiProperty({
    example: new Date('2023-06-29T02:12:37.810Z'),
    description: '생성 일자',
  })
  createdAt?: Date;

  @ApiProperty({
    example: new Date('2023-06-29T02:12:37.810Z'),
    description: '수정 일자',
  })
  updatedAt?: Date;
}

export class PaginatedTopicPresenter extends PaginatedPresenter<TopicPresenter> {
  @ApiProperty({ type: [TopicPresenter] })
  readonly data: readonly TopicPresenter[];
}
