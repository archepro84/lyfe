import { DeleteTopicCommand } from '@application/port/in/topic/command/delete-topic.command';

export interface DeleteTopicUsecase {
  exec(command: DeleteTopicCommand): Promise<void>;
}

export const DELETE_TOPIC_USECASE = Symbol('DeleteTopicUsecase');
