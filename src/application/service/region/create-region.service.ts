import { CreateRegionUsecase } from '@application/port/in/region/create-region.usecase';
import { RegionRepository } from '@application/port/out/region/region.repository';
import { CreateRegionCommand } from '@application/port/in/region/region.command';
import { Region, RegionFactory } from '@domain/region/region';
import { AlreadyExistsException } from '@domain/common/exception/already-exists.exception';
import { Transactional } from '@infrastructure/common/decorator/transactional.decorator';

export class CreateRegionService implements CreateRegionUsecase {
  constructor(private readonly regionRepository: RegionRepository) {}

  @Transactional()
  async exec(createRegionCommand: CreateRegionCommand): Promise<Region> {
    const region = await this.regionRepository.find(createRegionCommand);
    if (region)
      throw new AlreadyExistsException('해당 지역이 이미 존재합니다.');

    await this.regionRepository.insert(
      RegionFactory.newInstance({
        city: createRegionCommand.city,
        district: createRegionCommand.district,
        neighborhood: createRegionCommand.neighborhood,
      }),
    );

    const newRegion = await this.regionRepository.find(createRegionCommand);
    newRegion.checkLoaded();

    return newRegion;
  }
}
