import { User } from '@domain/user/user';

export class CommentCommand {
  public readonly topicId: string;
  public readonly user: User;

  public readonly content: string;
  public readonly parentId?: string;
}
