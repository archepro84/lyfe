import { Paginated } from '@application/port/out/repository.port';
import { Reply } from '@domain/topic/comment/reply';
import { FindReplyQuery } from '@application/port/in/topic/comment/query/find-reply.query';

export interface FindReplyUsecase {
  exec(query: FindReplyQuery): Promise<Paginated<Reply>>;
}

export const FIND_REPLY_USECASE = Symbol('FindReplyUsecase');
