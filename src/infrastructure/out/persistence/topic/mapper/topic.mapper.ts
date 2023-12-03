import { Injectable } from '@nestjs/common';
import { MapperPort } from '@application/port/out/mapper.port';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TopicEntity } from '@infrastructure/out/persistence/topic/schema/topic.schema';
import { Topic, TopicFactory } from '@domain/topic/topic';
import { RegionFactory } from '@domain/region/region';
import { Geometry } from '@domain/user/geometry';
import { Image } from '@domain/topic/image';
import { Vote } from '@domain/topic/vote/vote';
import { TopicUser } from '@domain/topic/topic-user';
import { VoteMapper } from '@infrastructure/out/persistence/topic/mapper/vote.mapper';

@Injectable()
export class TopicMapper implements MapperPort<TopicEntity, Topic> {
  constructor(
    @InjectModel(Topic.name) private readonly model: Model<TopicEntity>,
    private readonly voteMapper: VoteMapper,
  ) {}

  public toDomain(topicEntity: TopicEntity): Topic {
    if (!topicEntity) return null;

    let vote: Vote;
    let geometry: Geometry;
    let images: Image[];

    if (topicEntity.vote) vote = this.voteMapper.toDomain(topicEntity.vote);
    if (topicEntity.geometry)
      geometry = new Geometry({
        latitude: topicEntity.geometry.latitude,
        longitude: topicEntity.geometry.longitude,
        region: RegionFactory.newInstance(topicEntity.geometry.region),
      });
    if (topicEntity.images)
      images = topicEntity.images.map((image) => new Image(image));

    return TopicFactory.newInstance({
      id: topicEntity._id,
      title: topicEntity.title,
      content: topicEntity.content,
      user: new TopicUser({
        id: topicEntity.user._id,
        nickname: topicEntity.user.nickname,
      }),
      images: images,
      geometry: geometry,
      vote: vote,
      viewCount: topicEntity.viewCount,
      likeCount: topicEntity.likeCount,
      commentCount: topicEntity.commentCount,
      theme: topicEntity.theme,
      createdAt: topicEntity.createdAt,
      updatedAt: topicEntity.updatedAt,
      deletedAt: topicEntity.deletedAt,
    });
  }

  public toDomains(userEntities: TopicEntity[]): Topic[] {
    return userEntities.map(this.toDomain);
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
