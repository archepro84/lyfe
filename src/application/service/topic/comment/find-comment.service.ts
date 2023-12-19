import { TopicRepository } from '@application/port/out/topic/topic.repository';
import { Transactional } from '@infrastructure/common/decorator/transactional.decorator';
import { FindCommentQuery } from '@application/port/in/topic/comment/query/find-comment.query';
import { FindCommentUsecase } from '@application/port/in/topic/comment/usecase/find-comment.usecase';
import { CommentRepository } from '@application/port/out/topic/comment/comment.repository';
import { Paginated } from '@application/port/out/repository.port';
import { Comment } from '@domain/topic/comment/comment';
import { NotFoundException } from '@domain/common/exception/not-found.exception';
import { ReplyRepository } from '@application/port/out/topic/comment/reply.repository';

export class FindCommentService implements FindCommentUsecase {
  constructor(
    private readonly topicRepository: TopicRepository,
    private readonly commentRepository: CommentRepository,
    private readonly replyRepository: ReplyRepository,
  ) {}

  @Transactional()
  async exec(query: FindCommentQuery): Promise<Paginated<Comment>> {
    const isExistTopic = await this.topicRepository.findById(query.topicId);
    if (!isExistTopic)
      throw new NotFoundException('해당하는 게시글을 찾을 수 없습니다.');

    let paginatedComments: Paginated<Comment>;

    if (query.cursor)
      paginatedComments =
        await this.commentRepository.findCommentWithReplyByCursor(query);
    else
      paginatedComments = await this.commentRepository.findCommentWithReply(
        query,
      );

    return {
      ...paginatedComments,
      data: paginatedComments.data.map(this.convertDeletedCommentToNull),
    };
  }

  private convertDeletedCommentToNull(comment: Comment): Comment {
    if (!comment.deletedAt) return comment;

    return Object.assign(comment, {
      content: '',
      user: {
        id: '',
        nickname: '삭제된 사용자입니다.',
      },
    });
  }
}
