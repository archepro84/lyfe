import { User } from '@domain/user/user';
import { UserEntity } from '@adapter/out/persistence/user/schema/user.schema';

export class UserMapper {
  public static toDomain(userEntity: UserEntity): User {
    if (!userEntity) return null;

    const user = new User(
      userEntity._id,
      userEntity.nickname,
      userEntity.userInfo,
      userEntity.phoneNumber,
      userEntity.createdAt,
      userEntity.updatedAt,

      userEntity.authToken,
    );
    user.setLocation(userEntity.location);
    user.setLocationUpdatedAt(userEntity.locationUpdatedAt);
    user.setVerifiedAt(userEntity.verifiedAt);
    user.setDeletedAt(userEntity.deletedAt);

    return user;
  }

  public static toDomains(userEntities: UserEntity[]): User[] {
    return userEntities.map((userEntity) => this.toDomain(userEntity));
  }

  public static toPersistence(user: User): UserEntity {
    return new UserEntity(
      user.id,
      user.nickname,
      user.userInfo,
      user.phoneNumber,
      user.createdAt,
      user.updatedAt,

      user.getLocation(),
      user.getLocationUpdatedAt(),
      user.getVerifiedAt(),
      user.getAuthToken(),
      user.getDeletedAt(),
    );
  }
}
