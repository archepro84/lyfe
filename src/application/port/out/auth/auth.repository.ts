import { Auth } from '@domain/auth/auth';

export interface AuthRepository {
  getAuth(phoneNumber: string): Promise<Auth | null>;

  createAuth(phoneNumber: string, authCode: string): Promise<Auth>;

  updateAuth(authId: string, auth: Auth): Promise<Auth>;

  updateAuthCode(phoneNumber: string, authCode: string): Promise<Auth>;

  verifyAuth(phoneNumber: string): Promise<Auth>;
}
