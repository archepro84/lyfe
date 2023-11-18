import { Injectable } from '@nestjs/common';
import { MapperPort } from '@application/port/out/mapper.port';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TopicEntity } from '@adapter/out/persistence/topic/schema/topic.schema';
import { Topic, TopicFactory } from '@domain/topic/topic';
import { RegionFactory } from '@domain/region/region';
import { Geometry } from '@domain/user/geometry';
import { Image } from '@domain/topic/image';
import { VoteFactory } from '@domain/topic/vote/vote';
import { VoteItem } from '@domain/topic/vote/vote-item';
import { TopicUser } from '@domain/topic/topic-user';

@Injectable()
export class TopicMapper implements MapperPort<TopicEntity, Topic> {
  constructor(
    @InjectModel(Topic.name) private readonly model: Model<TopicEntity>,
  ) {}

  // FIXME: Entity to Mapper가 하위 Mapper를 참조하도록 수정 필요.
  public toDomain(topicEntity: TopicEntity): Topic {
    if (!topicEntity) return null;
    const vote = VoteFactory.newInstance({
      ...topicEntity.vote,
      id: topicEntity.vote._id ?? null,
      voteItem: topicEntity.vote.voteItem.map(
        (voteItem) =>
          new VoteItem({
            ...voteItem,
            id: voteItem._id ?? null,
          }),
      ),
    });

    const topic = TopicFactory.newInstance({
      id: topicEntity._id,
      title: topicEntity.title,
      content: topicEntity.content,
      user: new TopicUser({
        id: topicEntity.user._id,
        nickname: topicEntity.user.nickname,
      }),
      images: topicEntity.images.map((image) => new Image(image)),
      geometry: new Geometry({
        ...topicEntity.geometry,
        region: RegionFactory.newInstance(topicEntity.geometry.region),
      }),
      vote: vote,
      viewCount: topicEntity.viewCount,
      likeCount: topicEntity.likeCount,
      commentCount: topicEntity.commentCount,
      theme: topicEntity.theme,
      createdAt: topicEntity.createdAt,
      updatedAt: topicEntity.updatedAt,
      deletedAt: topicEntity.deletedAt,
    });

    return topic;
  }

  public toDomains(userEntities: TopicEntity[]): Topic[] {
    return userEntities.map((topicEntity) => this.toDomain(topicEntity));
  }

  public toPersistence(topic: Topic): TopicEntity {
    return new this.model({
      id: topic.id,
      title: topic.title,
      content: topic.content,
      theme: topic.theme,
      user: {
        _id: topic.user.id,
        nickname: topic.user.nickname,
      },
      images: topic.images,
      geometry: topic.geometry,
      vote: topic.vote,
      viewCount: null,
      likeCount: null,
      commentCount: null,
      createdAt: topic.createdAt,
      updatedAt: topic.updatedAt,
      deletedAt: topic.deletedAt,
    });
  }
}
