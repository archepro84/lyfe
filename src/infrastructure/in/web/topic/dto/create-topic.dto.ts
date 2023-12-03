import { OmitType } from '@nestjs/swagger';
import { TopicEntity } from '@infrastructure/out/persistence/topic/schema/topic.schema';

export class CreateTopicDto extends OmitType(TopicEntity, ['user']) {}
