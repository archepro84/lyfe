import { Transactional } from '@infrastructure/common/decorator/transactional.decorator';
import { TopicRepository } from '@application/port/out/topic/topic.repository';
import { NotFoundException } from '@domain/common/exception/not-found.exception';
import { User } from '@domain/user/user';
import { TopicUser } from '@domain/topic/topic-user';
import { CreateReplyUsecase } from '@application/port/in/topic/comment/usecase/create-reply.usecase';
import { ReplyRepository } from '@application/port/out/topic/comment/reply.repository';
import { CommentRepository } from '@application/port/out/topic/comment/comment.repository';
import { CreateReplyCommand } from '@application/port/in/topic/comment/command/create-reply.command';
import { Reply, ReplyFactory } from '@domain/topic/comment/reply';

export class CreateReplyService implements CreateReplyUsecase {
  constructor(
    private readonly topicRepository: TopicRepository,
    private readonly commentRepository: CommentRepository,
    private readonly replyRepository: ReplyRepository,
  ) {}

  @Transactional()
  async exec(command: CreateReplyCommand): Promise<void> {
    const isExistTopic = await this.topicRepository.findById(command.topicId);
    if (!isExistTopic)
      throw new NotFoundException('해당하는 게시글을 찾을 수 없습니다.');
    if (!(await this.commentRepository.findById(command.parentId)))
      throw new NotFoundException('해당하는 댓글을 찾을 수 없습니다.');

    return await this.replyRepository.insert(this.createReplyCommand(command));
  }

  private createReplyCommand(command: CreateReplyCommand): Reply {
    return ReplyFactory.newInstance({
      ...command,
      user: this.createTopicUserByCommand(command.user),
    });
  }

  private createTopicUserByCommand(user: User): TopicUser {
    return new TopicUser({
      id: user.id,
      nickname: user.getNickname(),
    });
  }
}
