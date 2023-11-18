import { TopicCommand } from '@application/port/in/topic/command/topic.command';
import { User } from '@domain/user/user';

export class DeleteTopicCommand implements Pick<TopicCommand, 'user'> {
  public readonly id: string;
  public readonly user: User;
}
