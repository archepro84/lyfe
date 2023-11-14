import { RepositoryPort } from '@application/port/out/repository.port';
import { Theme, Topic } from '@domain/topic/topic';

export interface TopicRepository extends RepositoryPort<Topic> {
  findByTheme(theme: Theme): Promise<Topic[]>;
}
