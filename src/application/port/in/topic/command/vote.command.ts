import { VoteItemCommand } from '@application/port/in/topic/command/vote-item.command';
import { VoteType } from '@domain/topic/vote/vote';

export class VoteCommand {
  public readonly voteItem: VoteItemCommand[];
  public readonly voteType: VoteType;
}
