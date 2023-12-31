import { UserRepository } from '@application/port/out/user/user.repository';
import { User } from '@domain/user/user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@infrastructure/adapter/out/persistence/user/schema/user.schema';
import { SignUpDetails } from '@application/port/in/auth/command/auth.command';
import { AuthToken } from '@domain/user/auth-token';
import { TokenRepository } from '@application/port/out/auth/token.repository';
import { UserMapper } from '@infrastructure/adapter/out/persistence/user/mapper/user.mapper';
import { Repository } from '@infrastructure/adapter/out/persistence/repository';
import { transactionSessionStorage } from '@infrastructure/adapter/out/persistence/common/transaction/transaction.session.storage';
import { UserInfo } from '@domain/user/user-info';

@Injectable()
export class UserMongoRepository
  extends Repository<UserEntity, User>
  implements UserRepository, TokenRepository<User>
{
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserEntity>,
    private readonly userMapper: UserMapper,
  ) {
    super(userModel, userMapper, transactionSessionStorage);
  }

  async getById(userId: string): Promise<User | null> {
    return this.userMapper.toDomain(
      await this.userModel.findById(userId).session(this.getSession()).exec(),
    );
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return this.userMapper.toDomain(
      await this.userModel
        .findOne({
          phoneNumber,
        })
        .session(this.getSession())
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
      { session: this.getSession() },
    );
  }

  async userSignIn(phoneNumber: string): Promise<User> {
    console.log(phoneNumber);
    return Promise.resolve(undefined);
  }

  async userSignUp(signUpDetails: SignUpDetails): Promise<User> {
    const createdUser = await this.userModel.create(
      [
        {
          ...signUpDetails,
          userInfo: new UserInfo(),
        },
      ],
      { session: this.getSession() },
    );

    return this.userMapper.toDomains(createdUser)[0];
  }

  async updateRefreshToken(
    userId: string,
    authToken: AuthToken,
  ): Promise<User> {
    return this.userMapper.toDomain(
      await this.userModel.findByIdAndUpdate(
        userId,
        {
          authToken: authToken,
        },
        { session: this.getSession() },
      ),
    );
  }
}
