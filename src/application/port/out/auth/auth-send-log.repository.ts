import { Auth } from '@domain/auth/auth';
import { AuthSendLog } from '@domain/auth/auth-send-log';
import { RepositoryPort } from '@application/port/out/repository.port';

export interface AuthSendLogRepository extends RepositoryPort<AuthSendLog> {
  createAuthSendLog(auth: Auth, phoneNumber: string): Promise<AuthSendLog>;

  getAuthSendLogCount(phoneNumber: string): Promise<number>;

  getLatestAuthSendLog(phoneNumber: string): Promise<AuthSendLog>;
}
