export class CreateTopicCommand {
  constructor(
    public readonly regionId: string,
    public readonly userId: string,
    public readonly theme: string,
    public readonly title: string,
    public readonly content: string,
    public readonly geometry?: string,
    public readonly images?: string[],
    public readonly voteId?: string,
  ) {}
}
