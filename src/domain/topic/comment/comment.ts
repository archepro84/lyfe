import { Domain } from '@domain/domain';
import { TopicUser } from '@domain/topic/topic-user';
import { EmptyContentException } from '@domain/topic/exception/empty-content.exception';
import { ContentLengthExceededException } from '@domain/topic/exception/content-length-exceeded.exception';
import { Reply } from '@domain/topic/comment/reply';

export const MAX_CONTENT_LENGTH = 500;

export type CommentRequiredProps = Readonly<
  Required<{
    topicId: string;
    user: TopicUser;
    content: string;
  }>
>;

export type CommentOptionalProps = Readonly<
  Partial<{
    id: string;
    replies: Reply[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  }>
>;

export type CommentProps = CommentRequiredProps & CommentOptionalProps;

export class Comment extends Domain {
  readonly id?: string;
  readonly createdAt: Date = new Date();
  readonly updatedAt: Date = new Date();
  readonly deletedAt?: Date;

  readonly topicId: string;
  readonly user: TopicUser;
  readonly content: string;

  replies: Reply[] = [];

  constructor(props: CommentProps) {
    super();

    Object.assign(this, props);
    this.checkComment();
  }

  private checkComment(): void {
    if (!this.content.trim())
      throw new EmptyContentException('댓글 내용이 비어있습니다.');
    if (this.content.length > MAX_CONTENT_LENGTH)
      throw new ContentLengthExceededException(
        '댓글 내용의 길이가 최대 제한을 초과하였습니다.',
      );
  }
}

export class CommentFactory {
  static newInstance(props: CommentProps): Comment {
    return new Comment(props);
  }
}
