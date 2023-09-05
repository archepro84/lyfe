import { AuthToken } from '@domain/user/auth-token';

export interface Accountable {
  setAuthToken(authToken: AuthToken);

  getAuthToken(): AuthToken;
}
