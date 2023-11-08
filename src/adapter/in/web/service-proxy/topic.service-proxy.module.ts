import { DynamicModule, Module } from '@nestjs/common';
import { CREATE_TOPIC_USECASE } from '@application/port/in/topic/create-topic.usecase';
import { CreateTopicService } from '@application/service/topic/create-topic.service';

@Module({
  imports: [],
})
export class TopicServiceProxyModule {
  static register(): DynamicModule {
    return {
      module: TopicServiceProxyModule,
      providers: [
        {
          inject: [],
          provide: CREATE_TOPIC_USECASE,
          useFactory: () => new CreateTopicService(),
        },
      ],
      exports: [CREATE_TOPIC_USECASE],
    };
  }
}
