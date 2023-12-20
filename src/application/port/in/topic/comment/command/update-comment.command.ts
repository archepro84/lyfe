import { CommentCommand } from '@application/port/in/topic/comment/command/comment.command';

export class UpdateCommentCommand extends CommentCommand {
  commentId: string;
}
