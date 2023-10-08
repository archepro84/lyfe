import { Domain } from '@domain/domain';

export class UserVote extends Domain {
  constructor(
    public readonly id: string,
    public readonly voteId: string,
    public readonly voteItemId: string,
  ) {
    super();
  }
}
