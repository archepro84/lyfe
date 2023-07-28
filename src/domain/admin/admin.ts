export class Admin {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date(),
  ) {}
}
