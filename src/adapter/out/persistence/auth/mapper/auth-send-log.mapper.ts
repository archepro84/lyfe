import { AuthSendLogEntity } from '@adapter/out/persistence/auth/schema/auth-send-log.schema';
import { AuthSendLog } from '@domain/auth/auth-send-log';

export class AuthSendLogMapper {
  public static toDomain(authSendLogEntity: AuthSendLogEntity): AuthSendLog {
    if (!authSendLogEntity) return null;

    const authSendLog = new AuthSendLog(
      authSendLogEntity.id,
      authSendLogEntity.authId,
      authSendLogEntity.phoneNumber,
      authSendLogEntity.sentAt,
    );

    return authSendLog;
  }

  public static toDomains(
    authSendLogEntities: AuthSendLogEntity[],
  ): AuthSendLog[] {
    return authSendLogEntities.map((authSendLogEntity) =>
      this.toDomain(authSendLogEntity),
    );
  }

  public static toPersistence(authSendLog: AuthSendLog): AuthSendLogEntity {
    const authSendLogEntity = new AuthSendLogEntity(
      authSendLog.id,
      authSendLog.authId,
      authSendLog.phoneNumber,
      authSendLog.sentAt,
    );

    return authSendLogEntity;
  }
}
