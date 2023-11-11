import { CreateTopicUsecase } from '@application/port/in/topic/create-topic.usecase';
import { CreateTopicCommand } from '@application/port/in/topic/command/create-topic.command';

export class CreateTopicService implements CreateTopicUsecase {
  async exec(command: CreateTopicCommand): Promise<void> {
    console.log(command);
    return Promise.resolve(undefined);
  }
}
