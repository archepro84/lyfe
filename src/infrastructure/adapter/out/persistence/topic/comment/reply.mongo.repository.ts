import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Repository } from '@infrastructure/adapter/out/persistence/repository';
import { transactionSessionStorage } from '@infrastructure/adapter/out/persistence/common/transaction/transaction.session.storage';
import { ReplyEntity } from '@infrastructure/adapter/out/persistence/topic/comment/schema/reply.schema';
import { Reply } from '@domain/topic/comment/reply';
import { ReplyRepository } from '@application/port/out/topic/comment/reply.repository';
import { ReplyMapper } from '@infrastructure/adapter/out/persistence/topic/comment/mapper/reply.mapper';
import { FindReplyQuery } from '@application/port/in/topic/comment/query/find-reply.query';
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  MAX_LIMIT,
  Paginated,
} from '@application/port/out/repository.port';

@Injectable()
export class ReplyMongoRepository
  extends Repository<ReplyEntity, Reply>
  implements ReplyRepository
{
  constructor(
    @InjectModel(Reply.name)
    private readonly replyModel: Model<ReplyEntity>,
    private readonly replyMapper: ReplyMapper,
  ) {
    super(replyModel, replyMapper, transactionSessionStorage);
  }

  async findPaginatedReply(query: FindReplyQuery): Promise<Paginated<Reply>> {
    const page = query.page ?? DEFAULT_PAGE;
    const limit =
      query.limit && query.limit <= MAX_LIMIT ? query.limit : DEFAULT_LIMIT;

    const domains = this.replyMapper.toDomains(
      await this.replyModel
        .find({
          topicId: new Types.ObjectId(query.topicId),
          parentId: new Types.ObjectId(query.commentId),
        })
        .skip((page - 1) * limit)
        .limit(limit)
        .session(this.getSession())
        .exec(),
    );

    return new Paginated({
      data: domains,
      count: domains.length,
      limit: limit,
      page: page,
    });
  }

  async findPaginatedReplyByCursor(
    query: FindReplyQuery,
  ): Promise<Paginated<Reply>> {
    const limit =
      query.limit && query.limit <= MAX_LIMIT ? query.limit : DEFAULT_LIMIT;

    const entities = await this.replyModel
      .find({
        topicId: new Types.ObjectId(query.topicId),
        parentId: new Types.ObjectId(query.commentId),
        _id: { $gt: new Types.ObjectId(query.cursor) },
      })
      .limit(limit)
      .session(this.getSession())
      .exec();

    return new Paginated({
      data: this.replyMapper.toDomains(entities),
      count: entities.length,
      limit: limit,
      cursor:
        entities.length === limit ? entities[entities.length - 1]._id : null,
    });
  }
}
