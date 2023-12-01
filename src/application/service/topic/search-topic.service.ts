import { TopicRepository } from '@application/port/out/topic/topic.repository';
import { FindAllTopicUsecase } from '@application/port/in/topic/find-all-topic.usecase';
import {
  Paginated,
  PaginatedQueryParams,
} from '@application/port/out/repository.port';
import { Topic } from '@domain/topic/topic';

export class SearchTopicService implements FindAllTopicUsecase {
  constructor(private readonly topicRepository: TopicRepository) {}

  async exec(query: PaginatedQueryParams): Promise<Paginated<Topic>> {
    let topics: Paginated<Topic>;

    if (query.cursor)
      topics = await this.topicRepository.findCursorPaginated(query);
    else topics = await this.topicRepository.findManyPaginated(query);

    return topics;
  }
}
