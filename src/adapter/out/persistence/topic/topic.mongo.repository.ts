import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Repository } from '@adapter/out/persistence/repository';
import { transactionSessionStorage } from '@adapter/out/persistence/common/transaction/transaction.session.storage';
import { TopicEntity } from '@adapter/out/persistence/topic/schema/topic.schema';
import { Theme, Topic } from '@domain/topic/topic';
import { TopicRepository } from '@application/port/out/topic/topic.repository';
import { TopicMapper } from '@adapter/out/persistence/topic/mapper/topic.mapper';

@Injectable()
export class TopicMongoRepository
  extends Repository<TopicEntity, Topic>
  implements TopicRepository
{
  constructor(
    @InjectModel(Topic.name) private readonly topicModel: Model<TopicEntity>,
    private readonly topicMapper: TopicMapper,
  ) {
    super(topicModel, topicMapper, transactionSessionStorage);
  }

  async findByTheme(theme: Theme): Promise<Topic[]> {
    return this.topicMapper.toDomains(
      await this.topicModel.find({ theme }).session(this.getSession()).exec(),
    );
  }
}
