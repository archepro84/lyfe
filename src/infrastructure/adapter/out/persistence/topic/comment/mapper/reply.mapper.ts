import { Injectable } from '@nestjs/common';
import { MapperPort } from '@application/port/out/mapper.port';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TopicUser } from '@domain/topic/topic-user';
import { ReplyEntity } from '@infrastructure/adapter/out/persistence/topic/comment/schema/reply.schema';
import { Reply, ReplyFactory } from '@domain/topic/comment/reply';

@Injectable()
export class ReplyMapper implements MapperPort<ReplyEntity, Reply> {
  constructor(
    @InjectModel(Reply.name) private readonly model: Model<ReplyEntity>,
  ) {}

  public toDomain(replyEntity: ReplyEntity): Reply {
    if (!replyEntity) return null;

    return ReplyFactory.newInstance({
      id: replyEntity._id,
      topicId: replyEntity.topicId,
      parentId: replyEntity.parentId,
      content: replyEntity.content,
      user: new TopicUser({
        id: replyEntity.user._id,
        nickname: replyEntity.user.nickname,
      }),
      createdAt: replyEntity.createdAt,
      deletedAt: replyEntity.deletedAt,
    });
  }

  public toDomains(replyEntities: ReplyEntity[]): Reply[] {
    return replyEntities.map((entity) => this.toDomain(entity));
  }

  public toPersistence(reply: Reply): ReplyEntity {
    return new this.model({
      _id: new Types.ObjectId(reply.id),
      topicId: new Types.ObjectId(reply.topicId),
      parentId: new Types.ObjectId(reply.parentId),
      content: reply.content,
      user: {
        _id: new Types.ObjectId(reply.user.id),
        nickname: reply.user.nickname,
      },
      createdAt: reply.createdAt,
      updatedAt: reply.updatedAt,
      deletedAt: reply.deletedAt,
    });
  }
}
