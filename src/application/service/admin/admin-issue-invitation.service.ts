import { Invitation, InvitationType } from '@domain/auth/invitation';
import { AdminIssueInvitationUsecase } from '@application/port/in/admin/admin-issue-invitation.usecase';
import { IssueInvitationUsecase } from '@application/port/in/auth/invitation/issue-invitation.usecase';
import { AdminRepository } from '@application/port/out/admin/admin.repository';
import { AdminIssueInvitationCommand } from '@application/port/in/admin/command/admin-issue-invitation.command';
import { NotFoundException } from '@domain/common/exception/not-found.exception';

export class AdminIssueInvitationService
  implements AdminIssueInvitationUsecase
{
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly issueInvitationUsecase: IssueInvitationUsecase,
  ) {}

  async exec(
    adminIssueInvitationCommand: AdminIssueInvitationCommand,
  ): Promise<Invitation> {
    const { adminId, inviteePhoneNumber } = adminIssueInvitationCommand;

    await this.validateAdmin(adminId);

    return await this.issueInvitationUsecase.exec({
      invitationType: InvitationType.ADMIN,
      inviterId: adminId,
      inviteePhoneNumber: inviteePhoneNumber,
    });
  }

  private async validateAdmin(adminId: string): Promise<void> {
    const admin = await this.adminRepository.getById(adminId);
    if (!admin)
      throw new NotFoundException('해당하는 Id의 어드민이 존재하지 않습니다.');
  }
}
