export class RegionCommand {
  public readonly city: string;
  public readonly district: string;
  public readonly neighborhood: string;
}

export class CreateRegionCommand {
  constructor(
    public readonly city: string,
    public readonly district: string,
    public readonly neighborhood: string,
  ) {}
}

export class GetRegionExactLocationCommand {
  constructor(
    public readonly city: string,
    public readonly district: string,
    public readonly neighborhood: string,
  ) {}
}
