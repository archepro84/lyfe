import { UserRepository } from '@application/port/out/user/user.repository';
import { UpdateUserProfileCommand } from '@application/port/in/user/command/user.command';
import { User } from '@domain/user/user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { UserMapper } from '@adapter/out/persistence/user/mapper/user.mapper';
import { UserEntity } from '@adapter/out/persistence/user/schema/user.schema';
import { SignUpCommand } from '@application/port/in/auth/command/auth.command';
import { RefreshToken } from '@domain/user/refresh-token';

@Injectable()
export class UserMongoRepository implements UserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserEntity>,
  ) {}

  async getUser(userId: string): Promise<User | null> {
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

  async updateUserProfile(
    userId: string,
    updateUserProfileCommand: UpdateUserProfileCommand,
  ): Promise<User> {
    return Promise.resolve(undefined);
  }

  async userSignIn(phoneNumber: string): Promise<User> {
    return Promise.resolve(undefined);
  }

  async userSignUp(userSignUpCommand: SignUpCommand): Promise<User> {
    return UserMapper.toDomain(
      await this.userModel.create({
        ...userSignUpCommand,
      }),
    );
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: RefreshToken,
  ): Promise<User> {
    return UserMapper.toDomain(
      await this.userModel.findByIdAndUpdate(userId, {
        token: refreshToken,
      }),
    );
  }
}
