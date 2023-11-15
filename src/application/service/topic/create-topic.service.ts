import { CreateTopicUsecase } from '@application/port/in/topic/create-topic.usecase';
import { CreateTopicCommand } from '@application/port/in/topic/command/create-topic.command';
import { TopicRepository } from '@application/port/out/topic/topic.repository';

export class CreateTopicService implements CreateTopicUsecase {
  constructor(private readonly topicRepository: TopicRepository) {}

  async exec(command: CreateTopicCommand): Promise<void> {
    console.log(command);
    return Promise.resolve(undefined);
  }
}
