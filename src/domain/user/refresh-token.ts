export class RefreshToken {
  token: string;

  createdAt: Date;

  constructor(token: string, createdAt: Date = new Date()) {
    this.token = token;
    this.createdAt = createdAt;
  }
}
