import { User } from '@domain/user/user';
import { UserEntity } from '@adapter/out/persistence/user/schema/user.schema';

export class UserMapper {
  public static toDomain(userEntity: UserEntity): User {
    if (!userEntity) return null;

    const user = new User(
      userEntity._id,
      userEntity.nickname,
      userEntity.phoneNumber,
      userEntity.location,
      userEntity.locationUpdatedAt,
      userEntity.verifiedAt,
      userEntity.authToken,
      userEntity.createdAt,
      userEntity.updatedAt,
    );

    return user;
  }

  public static toDomains(userEntities: UserEntity[]): User[] {
    return userEntities.map((userEntity) => this.toDomain(userEntity));
  }

  public static toPersistence(user: User): UserEntity {
    const userEntity = new UserEntity(
      user.id,
      user.nickname,
      user.phoneNumber,
      user.location,
      user.locationUpdatedAt,
      user.verifiedAt,
      user.authToken,
      user.createdAt,
      user.updatedAt,
    );

    return userEntity;
  }
}
