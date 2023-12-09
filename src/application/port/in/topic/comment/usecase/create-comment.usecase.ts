import { CreateCommentCommand } from '@application/port/in/topic/comment/command/create-comment.command';

export interface CreateCommentUsecase {
  exec(command: CreateCommentCommand): Promise<void>;
}

export const CREATE_COMMENT_USECASE = Symbol('CreateCommentUsecase');
