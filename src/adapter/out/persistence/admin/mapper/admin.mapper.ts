import { Admin } from '@domain/admin/admin';
import { AdminEntity } from '@adapter/out/persistence/admin/schema/admin.schema';

export class AdminMapper {
  public static toDomain(adminEntity: AdminEntity): Admin {
    if (!adminEntity) return null;

    const admin = new Admin(
      adminEntity.id,
      adminEntity.email,
      adminEntity.password,
      adminEntity.createdAt,
      adminEntity.updatedAt,
      adminEntity.authToken,
    );

    return admin;
  }

  public static toPersistence(admin: Admin): AdminEntity {
    const adminEntity = new AdminEntity(
      admin.id,
      admin.email,
      admin.password,
      admin.createdAt,
      admin.updatedAt,
      admin.getAuthToken(),
    );

    return adminEntity;
  }
}
