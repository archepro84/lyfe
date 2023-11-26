import { Topic } from '@domain/topic/topic';
import { FindTopicQuery } from '@application/port/in/topic/query/find-topic.query';

export interface FindTopicUsecase {
  exec(query: FindTopicQuery): Promise<Topic>;
}

export const FIND_TOPIC_USECASE = Symbol('FindTopicUsecase');
