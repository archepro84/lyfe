export class AuthToken {
  constructor(
    public readonly token: string,
    public readonly createdAt: Date = new Date(),
  ) {}
}
