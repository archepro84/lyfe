import { FindAllTopicQuery } from '@application/port/in/topic/query/find-all-topic.query';
import { Paginated } from '@application/port/out/repository.port';
import { Topic } from '@domain/topic/topic';

export interface FindAllTopicUsecase {
  exec(query: FindAllTopicQuery): Promise<Paginated<Topic>>;
}

export const FIND_ALL_TOPIC_USECASE = Symbol('FindAllTopicUsecase');
