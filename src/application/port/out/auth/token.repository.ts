import { AuthToken } from '@domain/user/auth-token';

export interface TokenRepository<T> {
  getById(adminId: string): Promise<T | null>;

  updateRefreshToken(authId: string, authToken: AuthToken): Promise<T>;
}
