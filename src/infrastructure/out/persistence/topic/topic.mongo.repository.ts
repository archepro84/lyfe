import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Repository } from '@infrastructure/out/persistence/repository';
import { transactionSessionStorage } from '@infrastructure/out/persistence/common/transaction/transaction.session.storage';
import { TopicEntity } from '@infrastructure/out/persistence/topic/schema/topic.schema';
import { Theme, Topic } from '@domain/topic/topic';
import { TopicRepository } from '@application/port/out/topic/topic.repository';
import { TopicMapper } from '@infrastructure/out/persistence/topic/mapper/topic.mapper';
import { SearchTopicQuery } from '@application/port/in/topic/query/search-topic.query';
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  MAX_LIMIT,
  Paginated,
} from '@application/port/out/repository.port';

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

  async searchTopic(query: SearchTopicQuery): Promise<Paginated<Topic>> {
    const page = query.page ?? DEFAULT_PAGE;
    const limit =
      !query.limit || query.limit > MAX_LIMIT ? DEFAULT_LIMIT : query.limit;

    const topics = await this.topicModel
      .find(this.parseSearchFilter<TopicEntity>(query.keyword))
      .limit(limit)
      .skip((page - 1) * limit)
      .session(this.getSession())
      .exec();

    return {
      count: topics.length,
      page,
      limit,
      data: this.topicMapper.toDomains(topics),
    };
  }

  private parseSearchFilter<T>(keyword?: string): FilterQuery<T> {
    return keyword
      ? {
          $text: { $search: keyword },
          deletedAt: { $exists: false },
        }
      : {
          deletedAt: { $exists: false },
        };
  }
}
