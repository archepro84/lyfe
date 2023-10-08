import { Domain } from '@domain/domain';

export type UserVoteProps = Readonly<
  Required<{
    id: string;
    voteId: string;
    voteItemId: string;
  }>
>;

export class UserVote extends Domain {
  public readonly id: string;
  public readonly voteId: string;
  public readonly voteItemId: string;

  constructor(userVoteProps: UserVoteProps) {
    super();

    Object.assign(this, userVoteProps);
  }

  static newInstance(userVoteProps: UserVoteProps): UserVote {
    return new UserVote(userVoteProps);
  }
}
