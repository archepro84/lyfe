export type TopicProps = Readonly<
  Required<{
    id: string;
    nickname: string;
  }>
>;

export class TopicUser {
  readonly id: string;
  readonly nickname: string;

  constructor(props: TopicProps) {
    Object.assign(this, props);
  }
}
