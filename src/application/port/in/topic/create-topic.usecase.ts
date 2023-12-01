import { CreateTopicCommand } from '@application/port/in/topic/command/create-topic.command';

export interface CreateTopicUsecase {
  exec(command: CreateTopicCommand): Promise<void>;
}

export const CREATE_TOPIC_USECASE = Symbol('CreateTopicUsecase');
