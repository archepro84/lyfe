import { DynamicModule, Module } from '@nestjs/common';
import { CREATE_TOPIC_USECASE } from '@application/port/in/topic/create-topic.usecase';
import { CreateTopicService } from '@application/service/topic/create-topic.service';
import { RepositoriesModule } from '@infrastructure/adapter/out/persistence/repositories.module';
import { TopicMongoRepository } from '@infrastructure/adapter/out/persistence/topic/topic.mongo.repository';
import { UPDATE_TOPIC_USECASE } from '@application/port/in/topic/update-topic.usecase';
import { DELETE_TOPIC_USECASE } from '@application/port/in/topic/delete-topic.usecase';
import { UpdateTopicService } from '@application/service/topic/update-topic.service';
import { DeleteTopicService } from '@application/service/topic/delete-topic.service';
import { FIND_ALL_TOPIC_USECASE } from '@application/port/in/topic/find-all-topic.usecase';
import { FindAllTopicService } from '@application/service/topic/find-all-topic.service';
import { SEARCH_TOPIC_USECASE } from '@application/port/in/topic/search-topic.usecase';
import { SearchTopicService } from '@application/service/topic/search-topic.service';
import { FIND_TOPIC_USECASE } from '@application/port/in/topic/find-topic.usecase';
import { FindTopicService } from '@application/service/topic/find-topic.service';
import { CREATE_COMMENT_USECASE } from '@application/port/in/topic/comment/usecase/create-comment.usecase';
import { CreateCommentService } from '@application/service/topic/comment/create-comment.service';
import { CommentMongoRepository } from '@infrastructure/adapter/out/persistence/topic/comment/comment.mongo.repository';
import { FIND_COMMENT_USECASE } from '@application/port/in/topic/comment/usecase/find-comment.usecase';
import { FindCommentService } from '@application/service/topic/comment/find-comment.service';
import { CREATE_REPLY_USECASE } from '@application/port/in/topic/comment/usecase/create-reply.usecase';
import { CreateReplyService } from '@application/service/topic/comment/create-reply.service';
import { ReplyMongoRepository } from '@infrastructure/adapter/out/persistence/topic/comment/reply.mongo.repository';
import { FIND_REPLY_USECASE } from '@application/port/in/topic/comment/usecase/find-reply.usecase';
import { FindReplyService } from '@application/service/topic/comment/find-reply.service';

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
          provide: FIND_TOPIC_USECASE,
          useFactory: (topicRepository: TopicMongoRepository) =>
            new FindTopicService(topicRepository),
        },
        {
          inject: [TopicMongoRepository],
          provide: FIND_ALL_TOPIC_USECASE,
          useFactory: (topicRepository: TopicMongoRepository) =>
            new FindAllTopicService(topicRepository),
        },
        {
          inject: [TopicMongoRepository],
          provide: SEARCH_TOPIC_USECASE,
          useFactory: (topicRepository: TopicMongoRepository) =>
            new SearchTopicService(topicRepository),
        },
        {
          inject: [
            TopicMongoRepository,
            CommentMongoRepository,
            ReplyMongoRepository,
          ],
          provide: CREATE_REPLY_USECASE,
          useFactory: (
            topicRepository: TopicMongoRepository,
            commentRepository: CommentMongoRepository,
            replyMongoRepository: ReplyMongoRepository,
          ) =>
            new CreateReplyService(
              topicRepository,
              commentRepository,
              replyMongoRepository,
            ),
        },
        {
          inject: [
            TopicMongoRepository,
            CommentMongoRepository,
            CREATE_REPLY_USECASE,
          ],
          provide: CREATE_COMMENT_USECASE,
          useFactory: (
            topicRepository: TopicMongoRepository,
            commentRepository: CommentMongoRepository,
            createReplyService: CreateReplyService,
          ) =>
            new CreateCommentService(
              topicRepository,
              commentRepository,
              createReplyService,
            ),
        },
        {
          inject: [
            TopicMongoRepository,
            CommentMongoRepository,
            ReplyMongoRepository,
          ],
          provide: FIND_COMMENT_USECASE,
          useFactory: (
            topicRepository: TopicMongoRepository,
            commentRepository: CommentMongoRepository,
            replyMongoRepository: ReplyMongoRepository,
          ) =>
            new FindCommentService(
              topicRepository,
              commentRepository,
              replyMongoRepository,
            ),
        },
        {
          inject: [
            TopicMongoRepository,
            CommentMongoRepository,
            ReplyMongoRepository,
          ],
          provide: FIND_REPLY_USECASE,
          useFactory: (
            topicRepository: TopicMongoRepository,
            commentRepository: CommentMongoRepository,
            replyMongoRepository: ReplyMongoRepository,
          ) =>
            new FindReplyService(
              topicRepository,
              commentRepository,
              replyMongoRepository,
            ),
        },
      ],
      exports: [
        CREATE_TOPIC_USECASE,
        UPDATE_TOPIC_USECASE,
        DELETE_TOPIC_USECASE,
        FIND_TOPIC_USECASE,
        FIND_ALL_TOPIC_USECASE,
        SEARCH_TOPIC_USECASE,
        CREATE_COMMENT_USECASE,
        FIND_COMMENT_USECASE,
        CREATE_REPLY_USECASE,
        FIND_REPLY_USECASE,
      ],
    };
  }
}
