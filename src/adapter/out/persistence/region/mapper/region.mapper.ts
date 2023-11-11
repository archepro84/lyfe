import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MapperPort } from '@application/port/out/mapper.port';
import { Injectable } from '@nestjs/common';
import { RegionEntity } from '@adapter/out/persistence/region/schema/region.schema';
import { Region } from '@domain/region/region';

@Injectable()
export class RegionMapper implements MapperPort<RegionEntity, Region> {
  constructor(
    @InjectModel(Region.name) private readonly model: Model<RegionEntity>,
  ) {}

  public toDomain(regionEntity: RegionEntity): Region {
    if (!regionEntity) return null;

    const region = new Region({
      city: regionEntity.city,
      district: regionEntity.district,
      neighborhood: regionEntity.neighborhood,
    });

    return region;
  }

  public toDomains(authEntities: RegionEntity[]): Region[] {
    return authEntities.map((regionEntity) => this.toDomain(regionEntity));
  }

  public toPersistence(region: Region): RegionEntity {
    return new this.model({
      city: region.city,
      district: region.district,
      neighborhood: region.neighborhood,
    });
  }
}
