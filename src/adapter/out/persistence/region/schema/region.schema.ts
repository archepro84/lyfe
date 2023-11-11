import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegionEntity extends Document {
  @ApiProperty({
    required: true,
    type: 'string',
    description: "지역의 '시도'",
    example: '서울특별시',
  })
  @IsString()
  city: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: "지역의 '시군구'",
    example: '강남구',
  })
  @IsString()
  district: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: "지역의 '법정 읍면동'",
    example: '삼성동',
  })
  @IsString()
  neighborhood: string;

  constructor(city: string, district: string, neighborhood: string) {
    super();

    this.city = city;
    this.district = district;
    this.neighborhood = neighborhood;
  }
}

@Schema()
export class RegionMongoSchema {
  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: String, required: true })
  district: string;

  @Prop({ type: String, required: true })
  neighborhood: string;
}

export const RegionSchema = SchemaFactory.createForClass(RegionMongoSchema);
