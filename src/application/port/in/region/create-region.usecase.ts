import { CreateRegionCommand } from '@application/port/in/region/region.command';
import { Region } from '@domain/region/region';

export interface CreateRegionUsecase {
  exec(createRegionCommand: CreateRegionCommand): Promise<Region>;
}

export const CREATE_REGION_USECASE = Symbol('CreateRegionUsecase');
