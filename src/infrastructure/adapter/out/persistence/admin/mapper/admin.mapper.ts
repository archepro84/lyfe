import { Admin } from '@domain/admin/admin';
import { AdminEntity } from '@infrastructure/adapter/out/persistence/admin/schema/admin.schema';
import { MapperPort } from '@application/port/out/mapper.port';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class AdminMapper implements MapperPort<AdminEntity, Admin> {
  constructor(
    @InjectModel(Admin.name) private readonly model: Model<AdminEntity>,
  ) {}

  public toDomain(adminEntity: AdminEntity): Admin {
    if (!adminEntity) return null;

    const admin = new Admin(
      adminEntity._id,
      adminEntity.email,
      adminEntity.password,
      adminEntity.createdAt,
      adminEntity.updatedAt,
      adminEntity.authToken,
    );

    return admin;
  }

  public toDomains(adminEntities: AdminEntity[]): Admin[] {
    return adminEntities.map((adminEntity) => this.toDomain(adminEntity));
  }

  public toPersistence(admin: Admin): AdminEntity {
    return new this.model({
      _id: new Types.ObjectId(admin.id),
      email: admin.email,
      password: admin.password,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
      authToken: admin.getAuthToken(),
    });
  }
}
