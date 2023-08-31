import { Gender } from '@domain/user/user-info';
import { Region } from '@domain/region/region';

export class UpdateUserInfoCommand {
  constructor(
    readonly userId: string,
    readonly nickname?: string,
    readonly gender?: Gender,
    readonly birth?: string,
    readonly region?: Region,
  ) {}
}
