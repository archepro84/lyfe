import { Admin } from '@domain/admin/admin';

export interface AdminRepository {
  signUpAdmin(admin: Admin): Promise<Admin>;

  getAdminByEmail(email: string): Promise<Admin | null>;

  getAdminById(adminId: string): Promise<Admin | null>;
}
