import { UpdateTopicCommand } from '@application/port/in/topic/command/update-topic.command';

export interface UpdateTopicUsecase {
  exec(command: UpdateTopicCommand): Promise<void>;
}

export const UPDATE_TOPIC_USECASE = Symbol('UpdateTopicUsecase');
