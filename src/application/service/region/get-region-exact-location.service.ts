import { RegionRepository } from '@application/port/out/region/region.repository';
import { GetRegionExactLocationCommand } from '@application/port/in/region/region.command';
import { Region } from '@domain/region/region';
import { GetRegionExactLocationQuery } from '@application/port/in/region/get-region-exact-location.query';
import { NotFoundException } from '@domain/common/exception/not-found.exception';

export class GetRegionExactLocationService
  implements GetRegionExactLocationQuery
{
  constructor(private readonly regionRepository: RegionRepository) {}

  async exec(
    getRegionExactLocationCommand: GetRegionExactLocationCommand,
  ): Promise<Region> {
    const region = await this.regionRepository.find(
      getRegionExactLocationCommand,
    );
    if (!region)
      throw new NotFoundException('해당하는 지역이 존재하지 않습니다.');
    return region;
  }
}
