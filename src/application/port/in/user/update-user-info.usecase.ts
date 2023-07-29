import { User } from '@domain/user/user';
import { UpdateUserInfoCommand } from '@application/port/in/user/command/update-user-info.command';

export interface UpdateUserInfoUsecase {
  exec(updateUserInfoCommand: UpdateUserInfoCommand): Promise<User>;
}

export const UPDATE_USER_INFO_USECASE = Symbol('UpdateUserInfoUsecase');
