import { Paginated } from '@application/port/out/repository.port';
import { FindCommentQuery } from '@application/port/in/topic/comment/query/find-comment.query';
import { Comment } from '@domain/topic/comment/comment';

export interface FindCommentUsecase {
  exec(query: FindCommentQuery): Promise<Paginated<Comment>>;
}

export const FIND_COMMENT_USECASE = Symbol('FindCommentUsecase');
