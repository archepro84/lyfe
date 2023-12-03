import { TopicRepository } from '@application/port/out/topic/topic.repository';
import { Transactional } from '@adapter/common/decorator/transactional.decorator';
import { DeleteTopicUsecase } from '@application/port/in/topic/delete-topic.usecase';
import { DeleteTopicCommand } from '@application/port/in/topic/command/delete-topic.command';
import { UnauthorizedException } from '@domain/common/exception/unauthorized.exception';
import { NotFoundException } from '@domain/common/exception/not-found.exception';

export class DeleteTopicService implements DeleteTopicUsecase {
  constructor(private readonly topicRepository: TopicRepository) {}

  @Transactional()
  async exec(command: DeleteTopicCommand): Promise<void> {
    const topic = await this.topicRepository.findById(command.id);

    if (!topic) throw new NotFoundException('게시글이 존재하지 않습니다.');
    if (!this.isTopicPermission(topic.user.id, command.user.id))
      throw new UnauthorizedException('게시글의 권한이 존재하지 않습니다.');

    await this.topicRepository.softDelete(topic);
  }

  private isTopicPermission(topicUserId: string, userId: string): boolean {
    return topicUserId.toString() === userId.toString();
  }
}
