import { DynamicModule, Module } from '@nestjs/common';
import { UserMongoRepository } from '@adapter/out/persistence/user/user.mongo.repository';
import { RepositoriesModule } from 'src/adapter/out/persistence/repositories.module';
import { UPDATE_USER_PROFILE_USECASE } from '@application/port/in/user/update-user-profile.usecase';
import { UpdateUserProfileService } from '@application/service/user/update-user-profile.service';
import { GET_USER_QUERY } from '@application/port/in/user/get-user.query';
import { GetUserService } from '@application/service/user/get-user.service';

@Module({
  imports: [RepositoriesModule],
})
export class UserServiceProxyModule {
  static register(): DynamicModule {
    return {
      module: UserServiceProxyModule,
      providers: [
        {
          inject: [UserMongoRepository],
          provide: UPDATE_USER_PROFILE_USECASE,
          useFactory: (userRepository: UserMongoRepository) =>
            new UpdateUserProfileService(userRepository),
        },
        {
          inject: [UserMongoRepository],
          provide: GET_USER_QUERY,
          useFactory: (userRepository: UserMongoRepository) =>
            new GetUserService(userRepository),
        },
      ],
      exports: [UPDATE_USER_PROFILE_USECASE, GET_USER_QUERY],
    };
  }
}
