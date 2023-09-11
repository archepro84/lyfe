import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthEntity } from '@adapter/out/persistence/auth/schema/auth.schema';
import { AuthRepository } from '@application/port/out/auth/auth.repository';
import { Auth } from '@domain/auth/auth';
import { AuthMapper } from '@adapter/out/persistence/auth/mapper/auth.mapper';
import { Repository } from '@adapter/out/persistence/repository';
import { transactionSessionStorage } from '@adapter/out/persistence/common/transaction/transaction.session.storage';

@Injectable()
export class AuthMongoRepository
  extends Repository<AuthEntity, Auth>
  implements AuthRepository
{
  constructor(
    @InjectModel(Auth.name) private readonly authModel: Model<AuthEntity>,
    private readonly authMapper: AuthMapper,
  ) {
    super(authModel, authMapper, transactionSessionStorage);
  }

  async createAuth(phoneNumber: string, authCode: string): Promise<Auth> {
    const auth = await this.authModel.create({
      phoneNumber,
      authCode,
    });

    return this.authMapper.toDomain(auth);
  }

  async getAuth(phoneNumber: string): Promise<Auth> {
    return this.authMapper.toDomain(
      await this.authModel.findOne({
        phoneNumber,
      }),
    );
  }

  async updateAuth(authId: string, auth: Auth): Promise<Auth> {
    return Promise.resolve(undefined);
  }

  async updateAuthCode(phoneNumber: string, authCode: string): Promise<Auth> {
    return this.authMapper.toDomain(
      await this.authModel
        .findOneAndUpdate(
          { phoneNumber },
          {
            $set: {
              authCode,
            },
          },
        )
        .exec(),
    );
  }

  // docs: https://www.mongodb.com/docs/manual/reference/operator/update-field/
  async verifyAuth(phoneNumber: string): Promise<Auth> {
    const auth = await this.authModel
      .findOneAndUpdate(
        { phoneNumber },
        {
          $set: {
            verified: true,
            verifiedAt: new Date(),
          },
        },
      )
      .exec();

    return this.authMapper.toDomain(auth);
  }
}
