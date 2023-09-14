import { GetRegionExactLocationCommand } from '@application/port/in/region/region.command';
import { Region } from '@domain/region/region';

export interface GetRegionExactLocationQuery {
  exec(
    getRegionExactLocationCommand: GetRegionExactLocationCommand,
  ): Promise<Region>;
}

export const GET_REGION_EXACT_LOCATION_QUERY = Symbol(
  'GetRegionExactLocationQuery',
);
