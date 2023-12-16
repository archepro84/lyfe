import { RepositoryPort } from '@application/port/out/repository.port';
import { Reply } from '@domain/topic/comment/reply';

export type ReplyRepository = RepositoryPort<Reply>;

export const DEFAULT_REPLY_LIMIT = 3;
