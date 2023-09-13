export class CreateRegionCommand {
  constructor(
    readonly city: string,
    readonly district: string,
    readonly neighborhood: string,
  ) {}
}
