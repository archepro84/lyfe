import { Invitation, InvitationType } from '@domain/auth/invitation';
import { AdminIssueInvitationUsecase } from '@application/port/in/admin/admin-issue-invitation.usecase';
import { IssueInvitationUsecase } from '@application/port/in/auth/invitation/issue-invitation.usecase';
import { AdminRepository } from '@application/port/out/admin/admin.repository';
import { AdminIssueInvitationCommand } from '@application/port/in/admin/command/admin-issue-invitation.command';
import { NotFoundException } from '@common/exception/not-found.exception';
import { UserRepository } from '@application/port/out/user/user.repository';

export class AdminIssueInvitationService
  implements AdminIssueInvitationUsecase
{
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly userRepository: UserRepository,
    private readonly issueInvitationUsecase: IssueInvitationUsecase,
  ) {}

  async exec(
    adminIssueInvitationCommand: AdminIssueInvitationCommand,
  ): Promise<Invitation> {
    const { adminId, inviteePhoneNumber } = adminIssueInvitationCommand;
    const admin = await this.adminRepository.getById(adminId);
    if (!admin)
      throw new NotFoundException('해당하는 Id의 어드민이 존재하지 않습니다.');

    const invitee = await this.userRepository.getUserByPhoneNumber(
      inviteePhoneNumber,
    );
    if (!invitee)
      throw new NotFoundException('초대 대상의 유저가 존재하지 않습니다.');

    return await this.issueInvitationUsecase.exec({
      invitationType: InvitationType.ADMIN,
      inviterId: admin.id,
      inviteePhoneNumber: invitee.phoneNumber,
    });
  }
}
