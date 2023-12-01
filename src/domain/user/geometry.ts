import { Region } from '@domain/region/region';

export type GeometryProps = Readonly<
  Required<{
    latitude: string;
    longitude: string;
    region: Region;
  }>
>;

export class Geometry {
  public readonly latitude: string;
  public readonly longitude: string;
  public readonly region: Region;

  constructor(props: GeometryProps) {
    Object.assign(this, props);
  }
}
