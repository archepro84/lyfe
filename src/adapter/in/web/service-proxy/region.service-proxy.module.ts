import { DynamicModule, Module } from '@nestjs/common';
import { CREATE_REGION_USECASE } from '@application/port/in/region/create-region.usecase';
import { RegionMongoRepository } from '@adapter/out/persistence/region/region.mongo.repository';
import { RepositoriesModule } from '@adapter/out/persistence/repositories.module';
import { CreateRegionService } from '@application/service/region/create-region.service';
import { GET_REGION_EXACT_LOCATION_QUERY } from '@application/port/in/region/get-region-exact-location.query';
import { GetRegionExactLocationService } from '@application/service/region/get-region-exact-location.service';

@Module({
  imports: [RepositoriesModule],
})
export class RegionServiceProxyModule {
  static register(): DynamicModule {
    return {
      module: RegionServiceProxyModule,
      providers: [
        {
          inject: [RegionMongoRepository],
          provide: CREATE_REGION_USECASE,
          useFactory: (regionMongoRepository: RegionMongoRepository) =>
            new CreateRegionService(regionMongoRepository),
        },
        {
          inject: [RegionMongoRepository],
          provide: GET_REGION_EXACT_LOCATION_QUERY,
          useFactory: (regionMongoRepository: RegionMongoRepository) =>
            new GetRegionExactLocationService(regionMongoRepository),
        },
      ],
      exports: [CREATE_REGION_USECASE, GET_REGION_EXACT_LOCATION_QUERY],
    };
  }
}
