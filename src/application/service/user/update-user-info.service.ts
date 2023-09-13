import { UpdateUserInfoUsecase } from '@application/port/in/user/update-user-info.usecase';
import { UpdateUserInfoCommand } from '@application/port/in/user/command/update-user-info.command';
import { User } from '@domain/user/user';
import { UserRepository } from '@application/port/out/user/user.repository';
import { NotFoundException } from '@common/exception/not-found.exception';
import { UserInfo } from '@domain/user/user-info';

export class UpdateUserInfoService implements UpdateUserInfoUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async exec(updateUserInfoCommand: UpdateUserInfoCommand): Promise<User> {
    const user = await this.ensureUserExists(updateUserInfoCommand.userId);
    await this.updateUserInfo(user, updateUserInfoCommand);
    await this.userRepository.updateUserInfo(user);

    return user;
  }

  private updateUserInfo(user: User, command: UpdateUserInfoCommand): void {
    let userInfo = user.getUserInfo();
    if (!userInfo) userInfo = new UserInfo();

    if (command.nickname) user.setNickname(command.nickname);
    if (command.regionId) userInfo.setRegionId(command.regionId);
    if (command.gender) userInfo.setGender(command.gender);
    if (command.birth) userInfo.setBirth(command.birth);

    user.setUserInfo(userInfo);
  }

  private async ensureUserExists(userId: string): Promise<User> {
    const user = await this.userRepository.getById(userId);
    if (!user)
      throw new NotFoundException('해당하는 사용자가 존재하지 않습니다.');

    return user;
  }
}
