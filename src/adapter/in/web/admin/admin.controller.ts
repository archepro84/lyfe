import {
  Body,
  Controller,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
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
import {
  ADMIN_TOKEN_USECASE,
  TokenUsecase,
} from '@application/port/in/auth/token/token.usecase';
import { Admin } from '@domain/admin/admin';
import { RefreshTokenHeader } from '@common/decorator/refresh-token-header.decorator';
import { JwtAdminRefreshGuard } from '@common/guard/jwt-admin-refresh.guard';
import { AccessTokenHeader } from '@common/decorator/access-token-header.decorator';
import { JwtAdminGuard } from '@common/guard/jwt-admin.guard';

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
    @Inject(ADMIN_TOKEN_USECASE)
    private readonly adminTokenUsecase: TokenUsecase<Admin>,
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
    const { accountable, accessToken, refreshToken } =
      await this.signInAdminUsecase.exec({
        email: signUpAdminDto.email,
        password: signUpAdminDto.password,
      });

    req.res.setHeader('Set-Cookie', [
      await this.adminTokenUsecase.parseCookieByJwtAccessToken(accessToken),
      await this.adminTokenUsecase.parseCookieByJwtRefreshToken(refreshToken),
    ]);

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
  @AccessTokenHeader()
  @ApiResponse({
    status: 201,
    description: 'Return success',
    type: String,
  })
  @UseGuards(JwtAdminGuard)
  async adminIssueInvitation(
    @Request() req: any,
    @Body('inviteePhoneNumber') inviteePhoneNumber?: string,
  ) {
    await this.adminIssueInvitationUsecase.exec({
      adminId: req.user.id,
      inviteePhoneNumber,
    });

    return 'success';
  }

  @Post('/refresh')
  @ApiOperation({ summary: 'Refresh Token' })
  @RefreshTokenHeader()
  @ApiResponse({
    status: 200,
    description: 'Return success',
    type: String,
  })
  @UseGuards(JwtAdminRefreshGuard)
  async refresh(@Request() req: any) {
    const accessToken = await this.adminTokenUsecase.getJwtAccessToken({
      id: req.user.id,
    });

    req.res.setHeader('Set-Cookie', [
      await this.adminTokenUsecase.parseCookieByJwtAccessToken(accessToken),
    ]);

    return 'success';
  }
}
