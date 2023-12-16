import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Repository } from '@infrastructure/adapter/out/persistence/repository';
import { transactionSessionStorage } from '@infrastructure/adapter/out/persistence/common/transaction/transaction.session.storage';
import { CommentEntity } from '@infrastructure/adapter/out/persistence/topic/comment/schema/comment.schema';
import { CommentRepository } from '@application/port/out/topic/comment/comment.repository';
import { CommentMapper } from '@infrastructure/adapter/out/persistence/topic/comment/mapper/comment.mapper';
import { Comment } from '@domain/topic/comment/comment';
import { FindCommentQuery } from '@application/port/in/topic/comment/query/find-comment.query';
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  MAX_LIMIT,
  Paginated,
} from '@application/port/out/repository.port';
import { DEFAULT_REPLY_LIMIT } from '@application/port/out/topic/comment/reply.repository';

@Injectable()
export class CommentMongoRepository
  extends Repository<CommentEntity, Comment>
  implements CommentRepository
{
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentEntity>,
    private readonly commentMapper: CommentMapper,
  ) {
    super(commentModel, commentMapper, transactionSessionStorage);
  }

  async findCommentWithReply(
    query: FindCommentQuery,
  ): Promise<Paginated<Comment>> {
    const page = query.page ?? DEFAULT_PAGE;
    const limit =
      !query.limit || query.limit > MAX_LIMIT ? DEFAULT_LIMIT : query.limit;

    const aggregation = [
      { $match: { topicId: query.topicId, deletedAt: { $exists: false } } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
      {
        $lookup: {
          from: 'replies',
          let: { commentId: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$parentId', '$$commentId'] } } },
            { $limit: DEFAULT_REPLY_LIMIT },
          ],
          as: 'replies',
        },
      },
    ];
    const comments = await this.commentModel.aggregate(aggregation).exec();

    return {
      count: comments.length,
      page,
      limit,
      data: this.commentMapper.toDomains(comments),
    };
  }
}
