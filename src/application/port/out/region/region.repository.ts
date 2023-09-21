import { RepositoryPort } from '@application/port/out/repository.port';
import { Region } from '@domain/region/region';
import { RegionProps } from '@application/port/out/region/region.types';

export interface RegionRepository extends RepositoryPort<Region> {
  find(props: RegionProps): Promise<Region>;
}
