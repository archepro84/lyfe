export class FindCommentQuery {
  public readonly page?: number;
  public readonly limit?: number;
  public readonly cursor?: string; // CommentId
  public readonly topicId: string;
}
