import { AuthEntity } from '@adapter/out/persistence/auth/schema/auth.schema';
import { Auth } from '@domain/auth/auth';

export class AuthMapper {
  public static toDomain(authEntity: AuthEntity): Auth {
    if (!authEntity) return null;

    const auth = new Auth(
      authEntity.id,
      authEntity.phoneNumber,
      authEntity.authCode,
      authEntity.createdAt,
      authEntity.verified,
      authEntity.verifiedAt,
    );

    return auth;
  }

  public static toDomains(authEntities: AuthEntity[]): Auth[] {
    return authEntities.map((authEntity) => this.toDomain(authEntity));
  }

  public static toPersistence(auth: Auth): AuthEntity {
    const authEntity = new AuthEntity(
      auth.id,
      auth.phoneNumber,
      auth.authCode,
      auth.createdAt,
      auth.verified,
      auth.verifiedAt,
    );

    return authEntity;
  }
}
