import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetRegionDto {
  @ApiProperty({
    example: '서울특별시',
    description: "지역의 '시도'",
  })
  @IsString()
  city: string;

  @ApiProperty({
    example: '강남구',
    description: "지역의 '시군구'",
  })
  @IsString()
  district: string;

  @ApiProperty({
    example: '삼성동',
    description: "지역의 '읍면동'",
  })
  @IsString()
  neighborhood: string;
}
