import { RegionRepository } from '@application/port/out/region/region.repository';
import { GetRegionExactLocationCommand } from '@application/port/in/region/region.command';
import { Region } from '@domain/region/region';
import { GetRegionExactLocationQuery } from '@application/port/in/region/get-region-exact-location.query';

export class GetRegionExactLocationService
  implements GetRegionExactLocationQuery
{
  constructor(private readonly regionRepository: RegionRepository) {}

  async exec(
    getRegionExactLocationCommand: GetRegionExactLocationCommand,
  ): Promise<Region> {
    return await this.regionRepository.find(getRegionExactLocationCommand);
  }
}
