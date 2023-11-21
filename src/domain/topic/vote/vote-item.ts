export type VoteItemRequireProp = Readonly<
  Required<{
    title: string;
    index: number;
  }>
>;

export type VoteItemOptionalProps = Readonly<
  Partial<{
    id: string;
  }>
>;

export type VoteItemProps = VoteItemRequireProp & VoteItemOptionalProps;

export class VoteItem {
  public readonly id?: string;
  public readonly title: string;
  public readonly index: number;

  constructor(props: VoteItemProps) {
    Object.assign(this, props);
  }
}
