import { CreateTopicCommand } from '@application/port/in/topic/command/create-topic.command';

export interface CreateTopicUsecase {
  exec(createTopicCommand: CreateTopicCommand): Promise<void>;
}
