import {
  Paginated,
  RepositoryPort,
} from '@application/port/out/repository.port';
import { Comment } from '@domain/topic/comment/comment';
import { FindCommentQuery } from '@application/port/in/topic/comment/query/find-comment.query';

export interface CommentRepository extends RepositoryPort<Comment> {
  findCommentWithReply(query: FindCommentQuery): Promise<Paginated<Comment>>;
}
