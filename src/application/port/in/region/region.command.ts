export class CreateRegionCommand {
  constructor(
    readonly city: string,
    readonly district: string,
    readonly neighborhood: string,
  ) {}
}

export class GetRegionExactLocationCommand {
  constructor(
    readonly city: string,
    readonly district: string,
    readonly neighborhood: string,
  ) {}
}
