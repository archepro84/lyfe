import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CommentEntity } from '@infrastructure/adapter/out/persistence/topic/comment/schema/comment.schema';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCommentDto extends OmitType(CommentEntity, [
  'user',
  'topicId',
]) {
  @ApiProperty({
    required: true,
    type: 'string',
    description: '부모 댓글 id',
    example: '649ce793f331996dcc3cddab',
  })
  @IsString()
  @IsOptional()
  parentId: string;
}
