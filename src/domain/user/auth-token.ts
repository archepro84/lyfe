export class AuthToken {
  constructor(public readonly token: string, public readonly createdAt: Date) {}

  static newInstance(token: string, createdAt: Date = new Date()) {
    return new AuthToken(token, createdAt);
  }
}
