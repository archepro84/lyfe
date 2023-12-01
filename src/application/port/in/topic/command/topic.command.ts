import { ImageCommand } from '@application/port/in/topic/command/image.command';
import { GeometryCommand } from '@application/port/in/user/command/geometry.command';
import { VoteCommand } from '@application/port/in/topic/command/vote.command';
import { Theme } from '@domain/topic/topic';
import { User } from '@domain/user/user';

export class TopicCommand {
  public readonly title: string;
  public readonly content: string;
  public readonly user: User;
  public readonly theme: Theme;

  public readonly images?: ImageCommand[];
  public readonly geometry?: GeometryCommand;
  public readonly vote?: VoteCommand;
}
