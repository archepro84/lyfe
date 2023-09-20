import { Admin } from '@domain/admin/admin';
import { RepositoryPort } from '@application/port/out/repository.port';

export interface AdminRepository extends RepositoryPort<Admin> {
  signUpAdmin(admin: Admin): Promise<Admin>;

  getAdminByEmail(email: string): Promise<Admin | null>;

  getById(adminId: string): Promise<Admin | null>;
}
