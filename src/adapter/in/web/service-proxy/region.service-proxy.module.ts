import { DynamicModule, Module } from '@nestjs/common';
import { CREATE_REGION_USECASE } from '@application/port/in/region/create-region.usecase';
import { RegionMongoRepository } from '@adapter/out/persistence/region/region.mongo.repository';
import { RepositoriesModule } from '@adapter/out/persistence/repositories.module';
import { CreateRegionService } from '@application/service/region/create-region.service';

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
      ],
      exports: [CREATE_REGION_USECASE],
    };
  }
}
