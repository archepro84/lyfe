import { SearchTopicQuery } from '@application/port/in/topic/query/search-topic.query';
import { Topic } from '@domain/topic/topic';
import { Paginated } from '@application/port/out/repository.port';

export interface SearchTopicUsecase {
  exec(query: SearchTopicQuery): Promise<Paginated<Topic>>;
}

export const SEARCH_TOPIC_USECASE = Symbol('SearchTopicUsecase');
