import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export class RegionEntity extends Document {
  id: string;

  city: string;

  district: string;

  neighborhood: string;

  constructor(
    id: string,
    city: string,
    district: string,
    neighborhood: string,
  ) {
    super();

    this.id = id;
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
