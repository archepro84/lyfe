import { AuthToken } from '@domain/user/auth-token';

export class Admin {
  public readonly id: string;
  public readonly email: string;
  public readonly password: string;
  public readonly createdAt: Date = new Date();
  public readonly updatedAt: Date = new Date();

  private authToken?: AuthToken;

  constructor(
    id: string,
    email: string,
    password: string,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    authToken: AuthToken = null,
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.authToken = authToken;
  }

  setAuthToken(authToken: AuthToken) {
    this.authToken = authToken;
  }

  getAuthToken(): AuthToken {
    return this.authToken;
  }
}
