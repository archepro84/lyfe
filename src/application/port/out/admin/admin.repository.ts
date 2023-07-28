import { Admin } from '@domain/admin/admin';
import { AuthToken } from '@domain/user/auth-token';

export interface AdminRepository {
  signUpAdmin(admin: Admin): Promise<Admin>;

  getAdminByEmail(email: string): Promise<Admin | null>;

  getById(adminId: string): Promise<Admin | null>;

  updateRefreshToken(adminId: string, authToken: AuthToken): Promise<Admin>;
}
