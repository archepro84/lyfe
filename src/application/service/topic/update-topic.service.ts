import { TopicRepository } from '@application/port/out/topic/topic.repository';
import { TopicFactory } from '@domain/topic/topic';
import { Image } from '@domain/topic/image';
import { Geometry } from '@domain/user/geometry';
import { RegionFactory } from '@domain/region/region';
import { Transactional } from '@common/decorator/transactional.decorator';
import { UpdateTopicUsecase } from '@application/port/in/topic/update-topic.usecase';
import { UpdateTopicCommand } from '@application/port/in/topic/command/update-topic.command';
import { UnauthorizedException } from '@common/exception/unauthorized.exception';
import { NotFoundException } from '@common/exception/not-found.exception';

export class UpdateTopicService implements UpdateTopicUsecase {
  constructor(private readonly topicRepository: TopicRepository) {}

  @Transactional()
  async exec(command: UpdateTopicCommand): Promise<void> {
    const topic = await this.topicRepository.findById(command.id);

    if (!topic) throw new NotFoundException('게시글이 존재하지 않습니다.');
    if (!this.isTopicPermission(topic.user.id, command.user.id))
      throw new UnauthorizedException('게시글의 권한이 존재하지 않습니다.');

    let geometry: Geometry = topic.geometry;
    const images: Image[] = topic.images;

    if (command.images) command.images.map((image) => new Image(image));
    if (command.geometry)
      geometry = new Geometry({
        ...command.geometry,
        region: RegionFactory.newInstance(command.geometry.region),
      });

    const updateTopic = TopicFactory.newInstance({
      id: command.id ?? topic.id,
      title: command.title ?? topic.title,
      content: command.content ?? topic.content,
      user: topic.user,
      theme: topic.theme,
      geometry: geometry,
      images: images,
    });

    await this.topicRepository.save(updateTopic);
  }

  private isTopicPermission(topicUserId: string, userId: string): boolean {
    return topicUserId.toString() === userId.toString();
  }
}
