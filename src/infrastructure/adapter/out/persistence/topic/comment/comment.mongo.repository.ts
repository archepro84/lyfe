import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Repository } from '@infrastructure/adapter/out/persistence/repository';
import { transactionSessionStorage } from '@infrastructure/adapter/out/persistence/common/transaction/transaction.session.storage';
import { CommentEntity } from '@infrastructure/adapter/out/persistence/topic/comment/schema/comment.schema';
import { CommentRepository } from '@application/port/out/topic/comment/comment.repository';
import { CommentMapper } from '@infrastructure/adapter/out/persistence/topic/comment/mapper/comment.mapper';
import { Comment } from '@domain/topic/comment/comment';

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
}
