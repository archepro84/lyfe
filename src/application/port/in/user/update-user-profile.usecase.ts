import { User } from '@domain/user/user';
import { UpdateUserProfileCommand } from '@application/port/in/user/command/user.command';

export interface UpdateUserProfileUsecase {
  updateUserProfile(
    updateUserProfileCommand: UpdateUserProfileCommand,
  ): Promise<User>;
}

export const UPDATE_USER_PROFILE_USECASE = Symbol('UpdateUserProfileUsecase');
