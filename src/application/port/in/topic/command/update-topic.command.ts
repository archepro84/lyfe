import { TopicCommand } from '@application/port/in/topic/command/topic.command';
import { User } from '@domain/user/user';
import { ImageCommand } from '@application/port/in/topic/command/image.command';
import { GeometryCommand } from '@application/port/in/user/command/geometry.command';

export class UpdateTopicCommand
  implements Omit<TopicCommand, 'vote' | 'theme'>
{
  public readonly id: string;
  public readonly title: string;
  public readonly content: string;
  public readonly user: User;

  public readonly images?: ImageCommand[];
  public readonly geometry?: GeometryCommand;
}
