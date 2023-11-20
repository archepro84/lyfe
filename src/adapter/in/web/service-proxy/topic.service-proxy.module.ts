import { DynamicModule, Module } from '@nestjs/common';
import { CREATE_TOPIC_USECASE } from '@application/port/in/topic/create-topic.usecase';
import { CreateTopicService } from '@application/service/topic/create-topic.service';
import { RepositoriesModule } from '@adapter/out/persistence/repositories.module';
import { TopicMongoRepository } from '@adapter/out/persistence/topic/topic.mongo.repository';
import { UPDATE_TOPIC_USECASE } from '@application/port/in/topic/update-topic.usecase';
import { DELETE_TOPIC_USECASE } from '@application/port/in/topic/delete-topic.usecase';
import { UpdateTopicService } from '@application/service/topic/update-topic.service';
import { DeleteTopicService } from '@application/service/topic/delete-topic.service';
import { FIND_ALL_TOPIC_USECASE } from '@application/port/in/topic/find-all-topic.usecase';
import { FindAllTopicService } from '@application/service/topic/find-all-topic.service';

@Module({
  imports: [RepositoriesModule],
})
export class TopicServiceProxyModule {
  static register(): DynamicModule {
    return {
      module: TopicServiceProxyModule,
      providers: [
        {
          inject: [TopicMongoRepository],
          provide: CREATE_TOPIC_USECASE,
          useFactory: (topicRepository: TopicMongoRepository) =>
            new CreateTopicService(topicRepository),
        },
        {
          inject: [TopicMongoRepository],
          provide: UPDATE_TOPIC_USECASE,
          useFactory: (topicRepository: TopicMongoRepository) =>
            new UpdateTopicService(topicRepository),
        },
        {
          inject: [TopicMongoRepository],
          provide: DELETE_TOPIC_USECASE,
          useFactory: (topicRepository: TopicMongoRepository) =>
            new DeleteTopicService(topicRepository),
        },
        {
          inject: [TopicMongoRepository],
          provide: FIND_ALL_TOPIC_USECASE,
          useFactory: (topicRepository: TopicMongoRepository) =>
            new FindAllTopicService(topicRepository),
        },
      ],
      exports: [
        CREATE_TOPIC_USECASE,
        UPDATE_TOPIC_USECASE,
        DELETE_TOPIC_USECASE,
        FIND_ALL_TOPIC_USECASE,
      ],
    };
  }
}
