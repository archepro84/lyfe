import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { RegionEntity } from '@infrastructure/out/persistence/region/schema/region.schema';

export class GeometryEntity {
  @ApiProperty({
    required: true,
    type: 'string',
    description: '경도',
    example: '127.123456',
  })
  @IsString()
  latitude: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: '위도',
    example: '37.123456',
  })
  @IsString()
  longitude: string;

  @ApiProperty({
    required: true,
    type: () => RegionEntity,
    description: '지역',
  })
  region: RegionEntity;
}
