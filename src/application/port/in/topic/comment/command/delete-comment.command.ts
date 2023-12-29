import { CommentCommand } from '@application/port/in/topic/comment/command/comment.command';
import { OmitType } from '@nestjs/swagger';

export class DeleteCommentCommand extends OmitType(CommentCommand, [
  'content',
] as const) {
  commentId: string;
}
