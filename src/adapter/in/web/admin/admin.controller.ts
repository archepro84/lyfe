import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ADMIN_ISSUE_INVITATION_USECASE,
  AdminIssueInvitationUsecase,
} from '@application/port/in/admin/admin-issue-invitation.usecase';
import {
  SIGN_UP_ADMIN_USECASE,
  SignUpAdminUsecase,
} from '@application/port/in/admin/sign-up-admin.usecase';
import { AdminPresenter } from '@adapter/in/web/admin/admin.presenter';

@Controller('admin')
@ApiTags('admin')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(AdminPresenter)
export class AdminController {
  constructor(
    @Inject(ADMIN_ISSUE_INVITATION_USECASE)
    private readonly adminIssueInvitationUsecase: AdminIssueInvitationUsecase,
    @Inject(SIGN_UP_ADMIN_USECASE)
    private readonly signUpAdminUsecase: SignUpAdminUsecase,
  ) {}

  @Post('issue-invitation')
  async adminIssueInvitation(
    @Body('inviteePhoneNumber') inviteePhoneNumber: string,
  ) {
    await this.adminIssueInvitationUsecase.exec({
      adminId: '64c37df1e564c37df1e55842f8ec39a4865842f8ec39a486',
      inviteePhoneNumber,
    });

    return 'success';
  }
}
