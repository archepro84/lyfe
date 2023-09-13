import { CreateRegionCommand } from '@application/port/in/region/region.command';

export interface CreateRegionUsecase {
  exec(createRegionCommand: CreateRegionCommand): Promise<void>;
}

export const CREATE_REGION_USECASE = Symbol('CreateRegionUsecase');
