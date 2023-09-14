import { ApiProperty } from '@nestjs/swagger';
import { Region } from '@domain/region/region';

export class RegionPresenter {
  @ApiProperty({
    example: '649ce895f331996dcc3cddb6',
    description: 'id',
  })
  id?: string;

  @ApiProperty({
    example: '서울특별시',
    description: "지역의 '시도'",
  })
  city: string;

  @ApiProperty({
    example: '강남구',
    description: "지역의 '시군구'",
  })
  district: string;

  @ApiProperty({
    example: '삼성동',
    description: "지역의 '읍면동'",
  })
  neighborhood: string;

  constructor(region: Region) {
    this.id = region.id;
    this.city = region.city;
    this.district = region.district;
    this.neighborhood = region.neighborhood;
  }
}
