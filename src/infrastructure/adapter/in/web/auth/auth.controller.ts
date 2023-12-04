import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  SEND_VERIFICATION_USECASE,
  SendVerificationUsecase,
} from '@application/port/in/auth/send-verification.usecase';
import {
  InvitationResponseDto,
  SendAuthCodeDto,
  SignUpUserDto,
  VerifyAuthCodeDto,
} from '@infrastructure/adapter/in/web/auth/auth.dto';
import {
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  VERIFICATION_AUTH_CODE_USECASE,
  VerificationAuthCodeUsecase,
} from '@application/port/in/auth/verification-auth-code.usecase';
import { AuthPresenter } from '@infrastructure/adapter/in/web/auth/auth.presenter';
import { UserPresenter } from '@infrastructure/adapter/in/web/user/user.presenter';
import {
  SIGN_UP_USECASE,
  SignUpUsecase,
} from '@application/port/in/auth/sign-up.usecase';
import { JwtAuthGuard } from '@infrastructure/common/guard/jwt-auth.guard';
import {
  GET_INVITATION_QUERY,
  GetInvitationQuery,
} from '@application/port/in/user/invitation/get-invitation.query';
import {
  TOKEN_USECASE,
  TokenUsecase,
} from '@application/port/in/auth/token/token.usecase';
import { User } from '@domain/user/user';
import { JwtAuthRefreshGuard } from '@infrastructure/common/guard/jwt-auth-refresh.guard';
import { AccessTokenHeader } from '@infrastructure/common/decorator/access-token-header.decorator';
import { RefreshTokenHeader } from '@infrastructure/common/decorator/refresh-token-header.decorator';

@Controller('auth')
@ApiTags('auth')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(AuthPresenter)
export class AuthController {
  constructor(
    @Inject(SIGN_UP_USECASE)
    private readonly userSignUpUsecase: SignUpUsecase,
    @Inject(SEND_VERIFICATION_USECASE)
    private readonly sendVerificationUsecase: SendVerificationUsecase,
    @Inject(VERIFICATION_AUTH_CODE_USECASE)
    private readonly verificationAuthCodeUsecase: VerificationAuthCodeUsecase,
    @Inject(GET_INVITATION_QUERY)
    private readonly getInvitationQuery: GetInvitationQuery,
    @Inject(TOKEN_USECASE)
    private readonly tokenUsecase: TokenUsecase<User>,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Send Auth Code' })
  @ApiResponse({
    status: 200,
    description: 'Return success',
    type: String,
  })
  async sendAuthCode(@Body() sendAuthCodeDto: SendAuthCodeDto) {
    const { phoneNumber } = sendAuthCodeDto;

    await this.sendVerificationUsecase.sendVerification(phoneNumber);
    return 'success';
  }

  @Put()
  @ApiOperation({ summary: 'Verify Auth Code' })
  @ApiResponse({
    status: 200,
    description: 'Return success',
    type: [UserPresenter],
    headers: {
      'Set-Cookie': {
        description: "The 'AccessToken' and 'RefreshToken'",
      },
    },
  })
  async verifyAuthCode(
    @Body() verifyAuthCodeDto: VerifyAuthCodeDto,
    @Request() req: any,
  ): Promise<UserPresenter> {
    const authVerificationResponseCommand =
      await this.verificationAuthCodeUsecase.verifyAuthCode(
        verifyAuthCodeDto.phoneNumber,
        verifyAuthCodeDto.authCode,
      );
    if (!authVerificationResponseCommand) return null;

    const { accessToken, refreshToken } = authVerificationResponseCommand;
    // 사용자 정보가 존재할 때, 쿠키와 함께 사용자 정보를 반환한다.
    req.res.setHeader('Set-Cookie', [
      await this.tokenUsecase.parseCookieByJwtAccessToken(accessToken),
      await this.tokenUsecase.parseCookieByJwtRefreshToken(refreshToken),
    ]);

    return new UserPresenter(authVerificationResponseCommand.accountable);
  }

  @Post('sign-up')
  @ApiOperation({ summary: 'SignUp User' })
  @ApiResponse({
    status: 200,
    description: 'Return user',
    type: UserPresenter,
    headers: {
      'Set-Cookie': {
        description: "The 'AccessToken' and 'RefreshToken'",
      },
    },
  })
  async signUp(
    @Body() signUpUserDto: SignUpUserDto,
    @Request() req: any,
  ): Promise<UserPresenter> {
    const { accountable, accessToken, refreshToken } =
      await this.userSignUpUsecase.exec({
        nickname: signUpUserDto.nickname,
        phoneNumber: signUpUserDto.phoneNumber,
        invitationCode: signUpUserDto.invitationCode,
      });

    req.res.setHeader('Set-Cookie', [
      await this.tokenUsecase.parseCookieByJwtAccessToken(accessToken),
      await this.tokenUsecase.parseCookieByJwtRefreshToken(refreshToken),
    ]);

    return new UserPresenter(accountable);
  }

  @Post('sign-out')
  @ApiOperation({ summary: 'Sign Out User' })
  @AccessTokenHeader()
  @UseGuards(JwtAuthGuard)
  async signOut() {
    return 'success';
  }

  @Get('invitation/:phoneNumber')
  @ApiOperation({ summary: 'Get Invitation Code' })
  @ApiParam({
    name: 'phoneNumber',
    description: '핸드폰 번호',
    type: String,
    example: '+8201017778484',
  })
  @ApiResponse({
    status: 200,
    description: 'Return InvitationCode',
    type: [InvitationResponseDto],
  })
  async getInvitation(
    @Param('phoneNumber') phoneNumber: string,
  ): Promise<InvitationResponseDto | null> {
    const invitation = await this.getInvitationQuery.exec(phoneNumber);
    if (!invitation) return null;

    return {
      invitationCode: invitation.invitationCode,
    };
  }

  @Post('/refresh')
  @ApiOperation({ summary: 'Refresh Token' })
  @RefreshTokenHeader()
  @ApiResponse({
    status: 200,
    description: 'Return success',
    type: String,
    headers: {
      'Set-Cookie': {
        description: "The 'AccessToken'",
      },
    },
  })
  @UseGuards(JwtAuthRefreshGuard)
  async refresh(@Request() req: any) {
    const accessToken = await this.tokenUsecase.getJwtAccessToken({
      id: req.user.id,
    });

    req.res.setHeader('Set-Cookie', [
      await this.tokenUsecase.parseCookieByJwtAccessToken(accessToken),
    ]);

    return 'success';
  }
}
