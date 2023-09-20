import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminRepository } from '@application/port/out/admin/admin.repository';
import { AdminEntity } from '@adapter/out/persistence/admin/schema/admin.schema';
import { Admin } from '@domain/admin/admin';
import { AdminMapper } from '@adapter/out/persistence/admin/mapper/admin.mapper';
import { AuthToken } from '@domain/user/auth-token';
import { TokenRepository } from '@application/port/out/auth/token.repository';
import { Repository } from '@adapter/out/persistence/repository';
import { transactionSessionStorage } from '@adapter/out/persistence/common/transaction/transaction.session.storage';

@Injectable()
export class AdminMongoRepository
  extends Repository<AdminEntity, Admin>
  implements AdminRepository, TokenRepository<Admin>
{
  constructor(
    @InjectModel('Admin')
    private readonly adminModel: Model<AdminEntity>,
    private readonly adminMapper: AdminMapper,
  ) {
    super(adminModel, adminMapper, transactionSessionStorage);
  }

  async signUpAdmin(admin: Admin): Promise<Admin> {
    const createdAdmin = await this.adminModel.create(
      [
        {
          email: admin.email,
          password: admin.password,
        },
      ],
      { session: this.getSession() },
    );

    return this.adminMapper.toDomains(createdAdmin)[0];
  }

  async getById(adminId: string): Promise<Admin | null> {
    return this.adminMapper.toDomain(
      await this.adminModel.findById(adminId).exec(),
    );
  }

  async getAdminByEmail(email: string): Promise<Admin | null> {
    return this.adminMapper.toDomain(
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
    return this.adminMapper.toDomain(
      await this.adminModel.findByIdAndUpdate(
        adminId,
        {
          authToken: authToken,
        },
        { session: this.getSession() },
      ),
    );
  }
}
