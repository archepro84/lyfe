import { CreateRegionUsecase } from '@application/port/in/region/create-region.usecase';
import { RegionRepository } from '@application/port/out/region/region.repository';
import { CreateRegionCommand } from '@application/port/in/region/region.command';
import { Region } from '@domain/region/region';

export class CreateRegionService implements CreateRegionUsecase {
  constructor(private readonly regionRepository: RegionRepository) {}

  async exec(createRegionCommand: CreateRegionCommand): Promise<void> {
    const { city, district, neighborhood } = createRegionCommand;

    await this.regionRepository.save(
      Region.newInstance(city.trim(), district.trim(), neighborhood.trim()),
    );
  }
}
