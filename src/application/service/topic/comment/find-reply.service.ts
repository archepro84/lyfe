import { TopicRepository } from '@application/port/out/topic/topic.repository';
import { Transactional } from '@infrastructure/common/decorator/transactional.decorator';
import { Paginated } from '@application/port/out/repository.port';
import { NotFoundException } from '@domain/common/exception/not-found.exception';
import { CommentRepository } from '@application/port/out/topic/comment/comment.repository';
import { ReplyRepository } from '@application/port/out/topic/comment/reply.repository';
import { FindReplyUsecase } from '@application/port/in/topic/comment/usecase/find-reply.usecase';
import { Reply } from '@domain/topic/comment/reply';
import { FindReplyQuery } from '@application/port/in/topic/comment/query/find-reply.query';

export class FindReplyService implements FindReplyUsecase {
  constructor(
    private readonly topicRepository: TopicRepository,
    private readonly commentRepository: CommentRepository,
    private readonly replyRepository: ReplyRepository,
  ) {}

  @Transactional()
  async exec(query: FindReplyQuery): Promise<Paginated<Reply>> {
    if (!(await this.topicRepository.findById(query.topicId)))
      throw new NotFoundException('해당하는 게시글을 찾을 수 없습니다.');

    if (!(await this.commentRepository.findById(query.commentId)))
      throw new NotFoundException('해당하는 댓글을 찾을 수 없습니다.');

    let paginatedReplies: Paginated<Reply>;
    if (query.cursor)
      paginatedReplies = await this.replyRepository.findPaginatedReplyByCursor(
        query,
      );
    else
      paginatedReplies = await this.replyRepository.findPaginatedReply(query);

    return {
      ...paginatedReplies,
      data: paginatedReplies.data.map(this.convertDeletedToNull),
    };
  }

  private convertDeletedToNull(reply: Reply): Reply {
    if (!reply.deletedAt) return reply;

    return Object.assign(reply, {
      content: '',
      user: {
        id: '',
        nickname: '삭제된 사용자입니다.',
      },
    });
  }
}
