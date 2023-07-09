import { UpdateUserProfileUsecase } from '@application/port/in/user/update-user-profile.usecase';
import { UpdateUserProfileCommand } from '@application/port/in/user/command/user.command';
import { User } from '@domain/user/user';
import { UserRepository } from '@application/port/out/user/user.repository';

export class UpdateUserProfileService implements UpdateUserProfileUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  updateUserProfile(
    updateUserProfileCommand: UpdateUserProfileCommand,
  ): Promise<User> {
    return Promise.resolve(undefined);
  }
}
