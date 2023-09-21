import { Auth } from '@domain/auth/auth';
import { RepositoryPort } from '@application/port/out/repository.port';

export interface AuthRepository extends RepositoryPort<Auth> {
  getAuth(phoneNumber: string): Promise<Auth | null>;

  createAuth(phoneNumber: string, authCode: string): Promise<Auth>;

  updateAuth(authId: string, auth: Auth): Promise<Auth>;

  updateAuthCode(phoneNumber: string, authCode: string): Promise<Auth>;

  verifyAuth(phoneNumber: string): Promise<Auth>;
}
