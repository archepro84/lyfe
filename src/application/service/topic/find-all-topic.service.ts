import { TopicRepository } from '@application/port/out/topic/topic.repository';
import { FindAllTopicUsecase } from '@application/port/in/topic/find-all-topic.usecase';
import { FindAllTopicQuery } from '@application/port/in/topic/query/find-all-topic.query';
import { Paginated } from '@application/port/out/repository.port';
import { Topic } from '@domain/topic/topic';

export class FindAllTopicService implements FindAllTopicUsecase {
  constructor(private readonly topicRepository: TopicRepository) {}

  async exec(query: FindAllTopicQuery): Promise<Paginated<Topic>> {
    const topics = await this.topicRepository.findManyPaginated(query);

    return topics;
  }
}
