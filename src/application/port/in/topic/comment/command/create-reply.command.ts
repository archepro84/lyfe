import { CommentCommand } from '@application/port/in/topic/comment/command/comment.command';

export class CreateReplyCommand extends CommentCommand {
  parentId: string;
}
