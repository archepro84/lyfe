export type VoteItemProps = Readonly<
  Required<{
    id: string;
    title: string;
    index: number;
  }>
>;

export class VoteItem {
  public readonly id: string;
  public readonly title: string;
  public readonly index: number;

  constructor(props: VoteItemProps) {
    Object.assign(this, props);
  }
}
