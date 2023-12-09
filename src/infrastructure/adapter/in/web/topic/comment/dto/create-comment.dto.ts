import { OmitType } from '@nestjs/swagger';
import { CommentEntity } from '@infrastructure/adapter/out/persistence/topic/comment/schema/comment.schema';

export class CreateCommentDto extends OmitType(CommentEntity, [
  'user',
  'topicId',
]) {}
