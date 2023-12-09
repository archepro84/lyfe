import { Injectable } from '@nestjs/common';
import { MapperPort } from '@application/port/out/mapper.port';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CommentEntity } from '@infrastructure/adapter/out/persistence/topic/comment/schema/comment.schema';
import { Comment, CommentFactory } from '@domain/topic/comment/comment';
import { TopicUser } from '@domain/topic/topic-user';

@Injectable()
export class CommentMapper implements MapperPort<CommentEntity, Comment> {
  constructor(
    @InjectModel(Comment.name) private readonly model: Model<CommentEntity>,
  ) {}

  public toDomain(commentEntity: CommentEntity): Comment {
    if (!commentEntity) return null;

    return CommentFactory.newInstance({
      id: commentEntity._id,
      topicId: commentEntity.topicId,
      parentId: commentEntity.patentId ?? undefined,
      content: commentEntity.content,
      user: new TopicUser({
        id: commentEntity.user._id,
        nickname: commentEntity.user.nickname,
      }),
      createdAt: commentEntity.createdAt,
      updatedAt: commentEntity.updatedAt,
      deletedAt: commentEntity.deletedAt,
    });
  }

  public toDomains(commentEntities: CommentEntity[]): Comment[] {
    return commentEntities.map(this.toDomain);
  }

  public toPersistence(comment: Comment): CommentEntity {
    return new this.model({
      id: comment.id,
      topicId: comment.topicId,
      patentId: comment.parentId,
      content: comment.content,
      user: {
        _id: comment.user.id,
        nickname: comment.user.nickname,
      },
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      deletedAt: comment.deletedAt,
    });
  }
}
