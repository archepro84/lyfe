import { Gender } from '@domain/user/user-info';

export class UpdateUserInfoCommand {
  constructor(
    readonly userId: string,
    readonly nickname?: string,
    readonly gender?: Gender,
    readonly birth?: string,
    readonly regionId?: string,
  ) {}
}
