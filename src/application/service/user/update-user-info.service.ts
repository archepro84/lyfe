import { UpdateUserInfoUsecase } from '@application/port/in/user/update-user-info.usecase';
import { UpdateUserInfoCommand } from '@application/port/in/user/command/update-user-info.command';
import { User } from '@domain/user/user';
import { UserRepository } from '@application/port/out/user/user.repository';
import { NotFoundException } from '@common/exception/not-found.exception';
import { UserInfo } from '@domain/user/user-info';
import { Region, RegionFactory } from '@domain/region/region';
import { RegionRepository } from '@application/port/out/region/region.repository';
import { Transactional } from '@common/decorator/transactional.decorator';
import { CreateRegionUsecase } from '@application/port/in/region/create-region.usecase';

export class UpdateUserInfoService implements UpdateUserInfoUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly regionRepository: RegionRepository,
    private readonly createRegionUsecase: CreateRegionUsecase,
  ) {}

  @Transactional()
  async exec(updateUserInfoCommand: UpdateUserInfoCommand): Promise<User> {
    const user = await this.ensureUserExists(updateUserInfoCommand.userId);
    await this.updateUserInfo(user, updateUserInfoCommand);
    await this.userRepository.updateUserInfo(user);

    return user;
  }

  private async ensureUserExists(userId: string): Promise<User> {
    const user = await this.userRepository.getById(userId);
    if (!user)
      throw new NotFoundException('해당하는 사용자가 존재하지 않습니다.');

    return user;
  }

  private async updateUserInfo(
    user: User,
    command: UpdateUserInfoCommand,
  ): Promise<void> {
    let userInfo = user.getUserInfo();
    if (!userInfo) userInfo = new UserInfo();

    if (command.nickname) user.setNickname(command.nickname);
    if (command.region)
      userInfo.setRegion(
        await this.findOrCreateRegion(RegionFactory.fromObject(command.region)),
      );
    if (command.gender) userInfo.setGender(command.gender);
    if (command.birth) userInfo.setBirth(command.birth);

    user.setUserInfo(userInfo);
  }

  private async findOrCreateRegion(regionProps: Region): Promise<Region> {
    let region = await this.getRegion(regionProps);

    if (!region) {
      region = await this.createRegionUsecase.exec({
        city: regionProps.city,
        district: regionProps.district,
        neighborhood: regionProps.neighborhood,
      });
    }

    return region;
  }

  private async getRegion(regionProps: Region): Promise<Region> {
    return await this.regionRepository.find({
      city: regionProps.city,
      district: regionProps.district,
      neighborhood: regionProps.neighborhood,
    });
  }
}
