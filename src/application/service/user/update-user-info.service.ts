import { UpdateUserInfoUsecase } from '@application/port/in/user/update-user-info.usecase';
import { UpdateUserInfoCommand } from '@application/port/in/user/command/update-user-info.command';
import { User } from '@domain/user/user';
import { UserRepository } from '@application/port/out/user/user.repository';
import { NotFoundException } from '@common/exception/not-found.exception';

export class UpdateUserInfoService implements UpdateUserInfoUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async exec(updateUserInfoCommand: UpdateUserInfoCommand): Promise<User> {
    return Promise.resolve(undefined);
  }
}
