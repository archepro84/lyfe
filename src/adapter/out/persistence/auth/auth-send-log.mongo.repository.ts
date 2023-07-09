import { Injectable } from '@nestjs/common';
import { AuthSendLogRepository } from '@application/port/out/auth/auth-send-log.repository';
import { AuthSendLog } from '@domain/auth/auth-send-log';
import { Auth } from '@domain/auth/auth';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthSendLogEntity } from '@adapter/out/persistence/auth/schema/auth-send-log.schema';
import { AuthSendLogMapper } from '@adapter/out/persistence/auth/mapper/auth-send-log.mapper';

@Injectable()
export class AuthSendLogMongoRepository implements AuthSendLogRepository {
  constructor(
    @InjectModel('AuthSendLog')
    private readonly authSendLogModel: Model<AuthSendLogEntity>,
  ) {}

  async createAuthSendLog(
    auth: Auth,
    phoneNumber: string,
  ): Promise<AuthSendLog> {
    const authSendLog = await this.authSendLogModel.create({
      authId: auth.id,
      phoneNumber,
    });

    return AuthSendLogMapper.toDomain(authSendLog);
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
      .exec();
  }

  async getLatestAuthSendLog(phoneNumber: string): Promise<AuthSendLog> {
    return AuthSendLogMapper.toDomain(
      await this.authSendLogModel
        .findOne({ phoneNumber }, {}, { sort: { sentAt: -1 } })
        .exec(),
    );
  }
}
