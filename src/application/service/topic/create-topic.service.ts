import { CreateTopicUsecase } from '@application/port/in/topic/create-topic.usecase';
import { CreateTopicCommand } from '@application/port/in/topic/command/create-topic.command';
import { TopicRepository } from '@application/port/out/topic/topic.repository';
import { TopicFactory } from '@domain/topic/topic';
import { Image } from '@domain/topic/image';
import { Geometry } from '@domain/user/geometry';
import { RegionFactory } from '@domain/region/region';
import { VoteFactory } from '@domain/topic/vote/vote';
import { VoteItem } from '@domain/topic/vote/vote-item';
import { Transactional } from '@common/decorator/transactional.decorator';

export class CreateTopicService implements CreateTopicUsecase {
  constructor(private readonly topicRepository: TopicRepository) {}

  @Transactional()
  async exec(command: CreateTopicCommand): Promise<void> {
    // FIXME: Topic 비즈니스 로직이 난잡하므로, 수정이필요함.
    const topic = TopicFactory.newInstance({
      ...command,
      id: null,
      images:
        command.images.length > 0
          ? command.images.map((image) => new Image(image))
          : undefined,
      user: {
        id: command.user.id,
        nickname: command.user.getNickname(),
      },
      geometry: command.geometry
        ? new Geometry({
            ...command.geometry,
            region: RegionFactory.newInstance(command.geometry.region),
          })
        : undefined,
      vote: command.vote
        ? VoteFactory.newInstance({
            ...command.vote,
            id: null,
            voteItem: command.vote.voteItem.map(
              (voteItem) => new VoteItem({ ...voteItem, id: null }),
            ),
          })
        : undefined,
    });

    await this.topicRepository.insert(topic);
  }
}
