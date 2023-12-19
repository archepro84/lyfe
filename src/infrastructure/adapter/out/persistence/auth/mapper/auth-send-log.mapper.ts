import { AuthSendLogEntity } from '@infrastructure/adapter/out/persistence/auth/schema/auth-send-log.schema';
import { AuthSendLog } from '@domain/auth/auth-send-log';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MapperPort } from '@application/port/out/mapper.port';

@Injectable()
export class AuthSendLogMapper
  implements MapperPort<AuthSendLogEntity, AuthSendLog>
{
  constructor(
    @InjectModel(AuthSendLog.name)
    private readonly model: Model<AuthSendLogEntity>,
  ) {}

  public toDomain(authSendLogEntity: AuthSendLogEntity): AuthSendLog {
    if (!authSendLogEntity) return null;

    const authSendLog = new AuthSendLog(
      authSendLogEntity.id,
      authSendLogEntity.authId,
      authSendLogEntity.phoneNumber,
      authSendLogEntity.sentAt,
    );

    return authSendLog;
  }

  public toDomains(authSendLogEntities: AuthSendLogEntity[]): AuthSendLog[] {
    return authSendLogEntities.map((authSendLogEntity) =>
      this.toDomain(authSendLogEntity),
    );
  }

  public toPersistence(authSendLog: AuthSendLog): AuthSendLogEntity {
    return new this.model({
      _id: new Types.ObjectId(authSendLog.id),
      authId: new Types.ObjectId(authSendLog.authId),
      phoneNumber: authSendLog.phoneNumber,
      sentAt: authSendLog.sentAt,
    });
  }
}
