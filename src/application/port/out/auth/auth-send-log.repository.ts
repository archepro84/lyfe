import { Auth } from '@domain/auth/auth';
import { AuthSendLog } from '@domain/auth/auth-send-log';

export interface AuthSendLogRepository {
  createAuthSendLog(auth: Auth, phoneNumber: string): Promise<AuthSendLog>;

  getAuthSendLogCount(phoneNumber: string): Promise<number>;

  getLatestAuthSendLog(phoneNumber: string): Promise<AuthSendLog>;
}
