import { Domain } from '@domain/domain';
import { VoteItem } from '@domain/topic/vote/vote-item';
import { InsufficientVoteItemException } from '@domain/topic/vote/exception/insufficient-vote-item.exception';

export enum VoteType {
  SINGLE = 'SINGLE',
  MULTIPLE = 'MULTIPLE',
}

export type VoteRequiredProps = Readonly<
  Required<{
    id: string;
    voidItem: VoteItem[];
    voteType: VoteType;
  }>
>;

export type VoteOptionalProps = Readonly<
  Required<{
    createdAt: Date;
    updatedAt: Date;
  }>
>;

export type VoteProps = VoteRequiredProps & VoteOptionalProps;

export class Vote extends Domain {
  public readonly id: string;
  public readonly voidItem: VoteItem[];
  public readonly voteType: VoteType;
  public readonly createdAt: Date = new Date();
  public readonly updatedAt: Date = new Date();

  constructor(voteProps: VoteProps) {
    super();

    Object.assign(this, voteProps);

    this.checkVoteItem();
  }

  checkVoteItem(): void {
    if (this.voidItem.length <= 0) {
      throw new InsufficientVoteItemException();
    }
  }
}

export class VoteFactory {
  static newInstance(voteProps: VoteProps): Vote {
    return new Vote(voteProps);
  }
}
