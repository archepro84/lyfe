import { ImageProps } from '@domain/topic/image';
import { User } from '@domain/user/user';
import { VoteProps } from '@domain/topic/vote/vote';
import { GeometryProps } from '@domain/user/geometry';
import { Theme } from '@domain/topic/topic';

export class CreateTopicCommand {
  public readonly user: User;
  public readonly title: string;
  public readonly content: string;
  public readonly theme: Theme;

  public readonly images?: ImageProps[];
  public readonly geometry?: GeometryProps;
  public readonly vote?: VoteProps;
}
