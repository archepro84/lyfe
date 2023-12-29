import { Transactional } from '@infrastructure/common/decorator/transactional.decorator';
import { TopicRepository } from '@application/port/out/topic/topic.repository';
import { CommentRepository } from '@application/port/out/topic/comment/comment.repository';
import { NotFoundException } from '@domain/common/exception/not-found.exception';
import { CommentFactory } from '@domain/topic/comment/comment';
import { UpdateCommentUsecase } from '@application/port/in/topic/comment/usecase/update-comment.usecase';
import { UpdateCommentCommand } from '@application/port/in/topic/comment/command/update-comment.command';
import { ReplyFactory } from '@domain/topic/comment/reply';
import { ReplyRepository } from '@application/port/out/topic/comment/reply.repository';
import { UnauthorizedException } from '@domain/common/exception/unauthorized.exception';

export class UpdateCommentService implements UpdateCommentUsecase {
  constructor(
    private readonly topicRepository: TopicRepository,
    private readonly commentRepository: CommentRepository,
    private readonly replyRepository: ReplyRepository,
  ) {}

  @Transactional()
  async exec(command: UpdateCommentCommand): Promise<void> {
    if (!(await this.topicRepository.findById(command.topicId)))
      throw new NotFoundException('해당하는 게시글을 찾을 수 없습니다.');

    if (command.parentId) return await this.updateReply(command);

    const comment = await this.commentRepository.findById(command.commentId);
    if (!comment)
      throw new NotFoundException('해당하는 댓글을 찾을 수 없습니다.');
    if (!this.isPermission(comment.user.id, command.user.id))
      throw new UnauthorizedException(
        '해당하는 댓글을 수정할 권한이 존재하지 않습니다.',
      );

    const updateComment = CommentFactory.newInstance({
      ...comment,
      content: command.content,
      updatedAt: new Date(),
    });

    return await this.commentRepository.update(updateComment);
  }

  private async updateReply(command: UpdateCommentCommand): Promise<void> {
    const comment = await this.commentRepository.findById(command.parentId);
    if (!comment)
      throw new NotFoundException('해당하는 댓글을 찾을 수 없습니다.');

    const reply = await this.replyRepository.findById(command.commentId);
    if (!reply)
      throw new NotFoundException('해당하는 대댓글을 찾을 수 없습니다.');

    if (!this.isPermission(reply.user.id, command.user.id))
      throw new UnauthorizedException(
        '해당하는 대댓글을 수정할 권한이 존재하지 않습니다.',
      );

    const updateReply = ReplyFactory.newInstance({
      ...reply,
      content: command.content,
      updatedAt: new Date(),
    });

    return await this.replyRepository.update(updateReply);
  }

  private isPermission(targetUserId: string, userId: string): boolean {
    return targetUserId.toString() === userId.toString();
  }
}
