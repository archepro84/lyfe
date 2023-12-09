import { RepositoryPort } from '@application/port/out/repository.port';
import { Comment } from '@domain/topic/comment/comment';

export type CommentRepository = RepositoryPort<Comment>;
