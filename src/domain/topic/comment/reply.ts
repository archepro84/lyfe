import { Domain } from '@domain/domain';
import { TopicUser } from '@domain/topic/topic-user';
import { EmptyContentException } from '@domain/topic/exception/empty-content.exception';
import { ContentLengthExceededException } from '@domain/topic/exception/content-length-exceeded.exception';
import { MAX_CONTENT_LENGTH } from '@domain/topic/comment/comment';

export type ReplyRequiredProps = Readonly<
  Required<{
    topicId: string;
    user: TopicUser;
    content: string;
    parentId: string;
  }>
>;

export type ReplyOptionalProps = Readonly<
  Partial<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  }>
>;

export type ReplyProps = ReplyRequiredProps & ReplyOptionalProps;

export class Reply extends Domain {
  readonly id?: string;
  readonly createdAt: Date = new Date();
  readonly updatedAt: Date = new Date();
  readonly deletedAt?: Date;

  readonly topicId: string;
  readonly user: TopicUser;
  readonly content: string;
  readonly parentId: string;

  constructor(props: ReplyProps) {
    super();

    Object.assign(this, props);
    this.checkReply();
  }

  private checkReply(): void {
    if (!this.content.trim())
      throw new EmptyContentException('댓글 내용이 비어있습니다.');
    if (this.content.length > MAX_CONTENT_LENGTH)
      throw new ContentLengthExceededException(
        '댓글 내용의 길이가 최대 제한을 초과하였습니다.',
      );
  }
}

export class ReplyFactory {
  static newInstance(props: ReplyProps): Reply {
    return new Reply(props);
  }
}
