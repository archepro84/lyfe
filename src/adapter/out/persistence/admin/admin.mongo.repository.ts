import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminRepository } from '@application/port/out/admin/admin.repository';
import { AdminEntity } from '@adapter/out/persistence/admin/schema/admin.schema';
import { Admin } from '@domain/admin/admin';
import { AdminMapper } from '@adapter/out/persistence/admin/mapper/admin.mapper';
import { AuthToken } from '@domain/user/auth-token';

@Injectable()
export class AdminMongoRepository implements AdminRepository {
  constructor(
    @InjectModel('Admin')
    private readonly adminModel: Model<AdminEntity>,
  ) {}

  async signUpAdmin(admin: Admin): Promise<Admin> {
    return AdminMapper.toDomain(
      await this.adminModel.create({
        email: admin.email,
        password: admin.password,
      }),
    );
  }

  async getById(adminId: string): Promise<Admin | null> {
    return AdminMapper.toDomain(await this.adminModel.findById(adminId).exec());
  }

  async getAdminByEmail(email: string): Promise<Admin | null> {
    return AdminMapper.toDomain(
      await this.adminModel
        .findOne({
          email,
        })
        .exec(),
    );
  }

  async updateRefreshToken(
    adminId: string,
    authToken: AuthToken,
  ): Promise<Admin> {
    return AdminMapper.toDomain(
      await this.adminModel.findByIdAndUpdate(adminId, {
        authToken: authToken,
      }),
    );
  }
}
