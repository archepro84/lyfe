import { DynamicModule, Module } from '@nestjs/common';
import { UserMongoRepository } from '@infrastructure/out/persistence/user/user.mongo.repository';
import { RepositoriesModule } from '@infrastructure/out/persistence/repositories.module';
import { UPDATE_USER_INFO_USECASE } from '@application/port/in/user/update-user-info.usecase';
import { UpdateUserInfoService } from '@application/service/user/update-user-info.service';
import { GET_USER_QUERY } from '@application/port/in/user/get-user.query';
import { GetUserService } from '@application/service/user/get-user.service';
import { RegionMongoRepository } from '@infrastructure/out/persistence/region/region.mongo.repository';
import { CREATE_REGION_USECASE } from '@application/port/in/region/create-region.usecase';
import { CreateRegionService } from '@application/service/region/create-region.service';
import { RegionServiceProxyModule } from '@infrastructure/in/web/service-proxy/region.service-proxy.module';

@Module({
  imports: [RepositoriesModule, RegionServiceProxyModule.register()],
})
export class UserServiceProxyModule {
  static register(): DynamicModule {
    return {
      module: UserServiceProxyModule,
      providers: [
        {
          inject: [
            UserMongoRepository,
            RegionMongoRepository,
            CREATE_REGION_USECASE,
          ],
          provide: UPDATE_USER_INFO_USECASE,
          useFactory: (
            userRepository: UserMongoRepository,
            regionMongoRepository: RegionMongoRepository,
            createRegionService: CreateRegionService,
          ) =>
            new UpdateUserInfoService(
              userRepository,
              regionMongoRepository,
              createRegionService,
            ),
        },
        {
          inject: [UserMongoRepository],
          provide: GET_USER_QUERY,
          useFactory: (userRepository: UserMongoRepository) =>
            new GetUserService(userRepository),
        },
      ],
      exports: [UPDATE_USER_INFO_USECASE, GET_USER_QUERY],
    };
  }
}
