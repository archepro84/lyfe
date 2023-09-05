import { UserRepository } from '@application/port/out/user/user.repository';
import { User } from '@domain/user/user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { UserMapper } from '@adapter/out/persistence/user/mapper/user.mapper';
import { UserEntity } from '@adapter/out/persistence/user/schema/user.schema';
import { SignUpDetails } from '@application/port/in/auth/command/auth.command';
import { AuthToken } from '@domain/user/auth-token';
import { TokenRepository } from '@application/port/out/auth/token.repository';

@Injectable()
export class UserMongoRepository
  implements UserRepository, TokenRepository<User>
{
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserEntity>,
  ) {}

  async getById(userId: string): Promise<User | null> {
    return UserMapper.toDomain(await this.userModel.findById(userId).exec());
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return UserMapper.toDomain(
      await this.userModel
        .findOne({
          phoneNumber,
        })
        .exec(),
    );
  }

  async updateUserInfo(user: User): Promise<void> {
    await this.userModel.updateOne(
      {
        _id: user.id,
      },
      {
        $set: {
          userInfo: user.getUserInfo(),
        },
      },
    );
  }

  async userSignIn(phoneNumber: string): Promise<User> {
    return Promise.resolve(undefined);
  }

  async userSignUp(signUpDetails: SignUpDetails): Promise<User> {
    return UserMapper.toDomain(
      await this.userModel.create({
        ...signUpDetails,
        userInfo: {},
      }),
    );
  }

  async updateRefreshToken(
    userId: string,
    authToken: AuthToken,
  ): Promise<User> {
    return UserMapper.toDomain(
      await this.userModel.findByIdAndUpdate(userId, {
        authToken: authToken,
      }),
    );
  }
}
