import { Body, Controller, Inject, Post, Request } from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ADMIN_ISSUE_INVITATION_USECASE,
  AdminIssueInvitationUsecase,
} from '@application/port/in/admin/admin-issue-invitation.usecase';
import {
  SIGN_UP_ADMIN_USECASE,
  SignUpAdminUsecase,
} from '@application/port/in/admin/sign-up-admin.usecase';
import { AdminPresenter } from '@adapter/in/web/admin/admin.presenter';
import { SignUpAdminDto } from '@adapter/in/web/admin/admin.dto';
import {
  SIGN_IN_ADMIN_USECASE,
  SignInAdminUsecase,
} from '@application/port/in/admin/sign-in-admin.usecase';

// TODO: Admin 도메인은 추후 별도의 서버리스 서비스로 분리될 예정.
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
    @Inject(SIGN_IN_ADMIN_USECASE)
    private readonly signInAdminUsecase: SignInAdminUsecase,
  ) {}

  @Post('sign-in')
  @ApiOperation({ summary: 'SignIn Admin' })
  @ApiResponse({
    status: 201,
    description: 'Return Admin',
    type: [AdminPresenter],
  })
  async signInAdmin(
    @Body() signUpAdminDto: SignUpAdminDto,
    @Request() req: any,
  ): Promise<AdminPresenter> {
    const { accountable, cookieWithRefreshToken } =
      await this.signInAdminUsecase.exec({
        email: signUpAdminDto.email,
        password: signUpAdminDto.password,
      });

    req.res.setHeader('Set-Cookie', [cookieWithRefreshToken]);

    return new AdminPresenter(accountable);
  }

  @Post('issue-invitation')
  @ApiOperation({ summary: 'Issue Invitation' })
  @ApiBody({
    description: '초대할 사용자의 핸드폰 번호',
    type: String,
    schema: {
      type: 'object',
      properties: {
        inviteePhoneNumber: {
          type: 'string',
          example: '+8201017778484',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Return success',
    type: String,
  })
  async adminIssueInvitation(
    @Body('inviteePhoneNumber') inviteePhoneNumber?: string,
  ) {
    await this.adminIssueInvitationUsecase.exec({
      adminId: '64c37df1e55842f8ec39a486',
      inviteePhoneNumber,
    });

    return 'success';
  }
}
