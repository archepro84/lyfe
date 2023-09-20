import { Injectable } from '@nestjs/common';
import { AuthSendLogRepository } from '@application/port/out/auth/auth-send-log.repository';
import { AuthSendLog } from '@domain/auth/auth-send-log';
import { Auth } from '@domain/auth/auth';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthSendLogEntity } from '@adapter/out/persistence/auth/schema/auth-send-log.schema';
import { AuthSendLogMapper } from '@adapter/out/persistence/auth/mapper/auth-send-log.mapper';
import { Repository } from '@adapter/out/persistence/repository';
import { transactionSessionStorage } from '@adapter/out/persistence/common/transaction/transaction.session.storage';

@Injectable()
export class AuthSendLogMongoRepository
  extends Repository<AuthSendLogEntity, AuthSendLog>
  implements AuthSendLogRepository
{
  constructor(
    @InjectModel('AuthSendLog')
    private readonly authSendLogModel: Model<AuthSendLogEntity>,
    private readonly authSendLogMapper: AuthSendLogMapper,
  ) {
    super(authSendLogModel, authSendLogMapper, transactionSessionStorage);
  }

  async createAuthSendLog(
    auth: Auth,
    phoneNumber: string,
  ): Promise<AuthSendLog> {
    const createdAuthSendLog = await this.authSendLogModel.create(
      {
        authId: auth.id,
        phoneNumber,
      },
      { session: this.getSession() },
    );

    return this.authSendLogMapper.toDomains(createdAuthSendLog)[0];
  }

  async getAuthSendLogCount(phoneNumber: string): Promise<number> {
    const yesterday = new Date().toISOString().substring(0, 10);
    const today = new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .substring(0, 10);

    return await this.authSendLogModel
      .countDocuments({
        phoneNumber,
        sentAt: {
          $gte: yesterday,
          $lt: today,
        },
      })
      .session(this.getSession())
      .exec();
  }

  async getLatestAuthSendLog(phoneNumber: string): Promise<AuthSendLog> {
    return this.authSendLogMapper.toDomain(
      await this.authSendLogModel
        .findOne(
          { phoneNumber },
          {},
          { sort: { sentAt: -1 }, session: this.getSession() },
        )
        .exec(),
    );
  }
}
