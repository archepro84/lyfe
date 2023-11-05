import { Domain } from '@domain/domain';

export type TopicViewRequiredProps = Readonly<
  Required<{
    id: string;
    userId: string;
    postId: string;
  }>
>;

export type TopicViewOptionalProps = Readonly<
  Partial<{
    createdAt: Date;
  }>
>;

export type TopicViewProps = TopicViewRequiredProps & TopicViewOptionalProps;

export class TopicView extends Domain {
  readonly id: string;
  readonly postId: string;
  readonly userId: string;
  readonly createdAt: Date = new Date();

  constructor(topicViewProps: TopicViewProps) {
    super();

    Object.assign(this, topicViewProps);
  }

  static newInstance(topicViewProps: TopicViewProps): TopicView {
    return new TopicView(topicViewProps);
  }
}
