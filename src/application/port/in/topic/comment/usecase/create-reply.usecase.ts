import { CreateReplyCommand } from '@application/port/in/topic/comment/command/create-reply.command';

export interface CreateReplyUsecase {
  exec(command: CreateReplyCommand): Promise<void>;
}

export const CREATE_REPLY_USECASE = Symbol('CreateReplyUsecase');
