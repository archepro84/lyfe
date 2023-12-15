import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Repository } from '@infrastructure/adapter/out/persistence/repository';
import { transactionSessionStorage } from '@infrastructure/adapter/out/persistence/common/transaction/transaction.session.storage';
import { ReplyEntity } from '@infrastructure/adapter/out/persistence/topic/comment/schema/reply.schema';
import { Reply } from '@domain/topic/comment/reply';
import { ReplyRepository } from '@application/port/out/topic/comment/reply.repository';
import { ReplyMapper } from '@infrastructure/adapter/out/persistence/topic/comment/mapper/reply.mapper';

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
}
