import { Domain } from '@domain/domain';

export type UserVoteProps = Readonly<
  Required<{
    id: string;
    voteId: string;
    voteItemId: string;
    userId: string;
  }>
>;

export class UserVote extends Domain {
  public readonly id: string;
  public readonly voteId: string;
  public readonly voteItemId: string;
  public readonly userId: string;

  constructor(props: UserVoteProps) {
    super();

    Object.assign(this, props);
  }

  static newInstance(props: UserVoteProps): UserVote {
    return new UserVote(props);
  }
}
