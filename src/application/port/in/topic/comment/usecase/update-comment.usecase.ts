import { UpdateCommentCommand } from '@application/port/in/topic/comment/command/update-comment.command';

export interface UpdateCommentUsecase {
  exec(command: UpdateCommentCommand): Promise<void>;
}

export const UPDATE_COMMENT_USECASE = Symbol('UpdateCommentUsecase');
