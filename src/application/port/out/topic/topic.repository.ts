import {
  Paginated,
  RepositoryPort,
} from '@application/port/out/repository.port';
import { Theme, Topic } from '@domain/topic/topic';
import { SearchTopicQuery } from '@application/port/in/topic/query/search-topic.query';

export interface TopicRepository extends RepositoryPort<Topic> {
  findByTheme(theme: Theme): Promise<Topic[]>;

  searchTopic(query: SearchTopicQuery): Promise<Paginated<Topic>>;
}
