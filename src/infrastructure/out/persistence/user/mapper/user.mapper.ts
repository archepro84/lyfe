import { User } from '@domain/user/user';
import { UserEntity } from '@infrastructure/out/persistence/user/schema/user.schema';
import { UserInfo } from '@domain/user/user-info';
import { Injectable } from '@nestjs/common';
import { MapperPort } from '@application/port/out/mapper.port';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

// TODO Mapper가 과연 Injectable하게 선언되어야하는가?
@Injectable()
export class UserMapper implements MapperPort<UserEntity, User> {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserEntity>,
  ) {}

  public toDomain(userEntity: UserEntity): User {
    if (!userEntity) return null;

    const user = new User(
      userEntity._id,
      userEntity.nickname,
      UserInfo.fromObject(userEntity.userInfo),
      userEntity.phoneNumber,
      userEntity.createdAt,
      userEntity.updatedAt,

      userEntity.authToken,
    );
    user.setVerifiedAt(userEntity.verifiedAt);
    user.setDeletedAt(userEntity.deletedAt);

    return user;
  }

  public toDomains(userEntities: UserEntity[]): User[] {
    return userEntities.map((userEntity) => this.toDomain(userEntity));
  }

  public toPersistence(user: User): UserEntity {
    return new this.model({
      id: user.id,
      nickname: user.getNickname(),
      userInfo: user.getUserInfo(),
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,

      verifiedAt: user.getVerifiedAt(),
      authToken: user.getAuthToken(),
      deletedAt: user.getDeletedAt(),
    });
  }
}
