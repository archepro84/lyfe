import { TopicRepository } from '@application/port/out/topic/topic.repository';
import { Topic } from '@domain/topic/topic';
import { FindTopicUsecase } from '@application/port/in/topic/find-topic.usecase';
import { FindTopicQuery } from '@application/port/in/topic/query/find-topic.query';
import { Transactional } from '@infrastructure/common/decorator/transactional.decorator';

export class FindTopicService implements FindTopicUsecase {
  constructor(private readonly topicRepository: TopicRepository) {}

  @Transactional()
  async exec(query: FindTopicQuery): Promise<Topic> {
    const topic = await this.topicRepository.findById(query.id);

    return topic;
  }
}
