import { CreateTopicUsecase } from '@application/port/in/topic/create-topic.usecase';
import { CreateTopicCommand } from '@application/port/in/topic/command/create-topic.command';
import { TopicRepository } from '@application/port/out/topic/topic.repository';
import { Topic, TopicFactory } from '@domain/topic/topic';
import { Image } from '@domain/topic/image';
import { Geometry } from '@domain/user/geometry';
import { RegionFactory } from '@domain/region/region';
import { Vote, VoteFactory } from '@domain/topic/vote/vote';
import { VoteItemFactory } from '@domain/topic/vote/vote-item';
import { Transactional } from '@common/decorator/transactional.decorator';
import { ImageCommand } from '@application/port/in/topic/command/image.command';
import { TopicUser } from '@domain/topic/topic-user';
import { User } from '@domain/user/user';
import { GeometryCommand } from '@application/port/in/user/command/geometry.command';
import { VoteCommand } from '@application/port/in/topic/command/vote.command';

export class CreateTopicService implements CreateTopicUsecase {
  constructor(private readonly topicRepository: TopicRepository) {}

  @Transactional()
  async exec(command: CreateTopicCommand): Promise<void> {
    const topic = this.createTopicByCommand(command);

    await this.topicRepository.insert(topic);
  }

  private createTopicByCommand(command: CreateTopicCommand): Topic {
    return TopicFactory.newInstance({
      ...command,
      images: this.createImageByCommand(command.images),
      user: this.createTopicUserByCommand(command.user),
      geometry: this.createGeometryByCommand(command.geometry),
      vote: this.createVoteByCommand(command.vote),
    });
  }

  private createImageByCommand(images: ImageCommand[]): Image[] | undefined {
    return images.length > 0
      ? images.map((image) => new Image(image))
      : undefined;
  }

  private createTopicUserByCommand(user: User): TopicUser {
    return new TopicUser({
      id: user.id,
      nickname: user.getNickname(),
    });
  }

  private createGeometryByCommand(
    geometry: GeometryCommand,
  ): Geometry | undefined {
    return geometry
      ? new Geometry({
          ...geometry,
          region: RegionFactory.newInstance(geometry.region),
        })
      : undefined;
  }

  private createVoteByCommand(vote: VoteCommand): Vote | undefined {
    return vote
      ? VoteFactory.newInstance({
          ...vote,
          voteItem: vote.voteItem.map(VoteItemFactory.newInstance),
        })
      : undefined;
  }
}
