export class FindReplyQuery {
  public readonly page?: number;
  public readonly limit?: number;
  public readonly topicId: string;
  public readonly commentId: string;
  public readonly cursor?: string; // ReplyId
}
