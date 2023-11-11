import { RegionCommand } from '@application/port/in/region/region.command';

export class GeometryCommand {
  public readonly latitude: string;
  public readonly longitude: string;
  public readonly region: RegionCommand;
}
