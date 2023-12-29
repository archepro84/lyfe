import { DeleteCommentCommand } from '@application/port/in/topic/comment/command/delete-comment.command';

export interface DeleteCommentUsecase {
  exec(command: DeleteCommentCommand): Promise<void>;
}

export const DELETE_COMMENT_USECASE = Symbol('DeleteCommentUsecase');
