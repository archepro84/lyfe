import {
  Paginated,
  RepositoryPort,
} from '@application/port/out/repository.port';
import { Reply } from '@domain/topic/comment/reply';
import { FindReplyQuery } from '@application/port/in/topic/comment/query/find-reply.query';

export interface ReplyRepository extends RepositoryPort<Reply> {
  findPaginatedReply(query: FindReplyQuery): Promise<Paginated<Reply>>;

  findPaginatedReplyByCursor(query: FindReplyQuery): Promise<Paginated<Reply>>;
}

export const DEFAULT_REPLY_LIMIT = 3;
