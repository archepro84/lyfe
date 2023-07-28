import {
  Body,
  Controller,
  Inject,
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
  SendAuthCodeDto,
  SignUpUserDto,
  VerifyAuthCodeDto,
  VerifyAuthCodeResponseDto,
} from '@adapter/in/web/auth/auth.dto';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  VERIFICATION_AUTH_CODE_USECASE,
  VerificationAuthCodeUsecase,
} from '@application/port/in/auth/verification-auth-code.usecase';
import { AuthPresenter } from '@adapter/in/web/auth/auth.presenter';
import { UserPresenter } from '@adapter/in/web/user/user.presenter';
import {
  SIGN_UP_USECASE,
  SignUpUsecase,
} from '@application/port/in/auth/sign-up.usecase';
import { JwtAuthGuard } from '@common/guard/jwt-auth.guard';

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
  ) {}

  @Post()
  @ApiOperation({ summary: 'Send Auth Code' })
  @ApiResponse({
    status: 200,
    description: 'Return success',
    type: 'success',
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
  })
  async verifyAuthCode(
    @Body() verifyAuthCodeDto: VerifyAuthCodeDto,
    @Request() req: any,
  ): Promise<UserPresenter> {
    const { phoneNumber, authCode } = verifyAuthCodeDto;

    const authVerificationResponseCommand =
      await this.verificationAuthCodeUsecase.verifyAuthCode(
        phoneNumber,
        authCode,
      );
    if (!authVerificationResponseCommand) return null;

    req.res.setHeader('Set-Cookie', [
      authVerificationResponseCommand.cookieWithRefreshToken,
    ]);

    return new UserPresenter(authVerificationResponseCommand.accountable);
  }

  @Post('sign-up')
  @ApiOperation({ summary: 'SignUp User' })
  @ApiResponse({
    status: 200,
    description: 'Return user',
    type: [UserPresenter],
  })
  async signUp(
    @Body() signUpUserDto: SignUpUserDto,
    @Request() req: any,
  ): Promise<UserPresenter> {
    const { accountable, cookieWithRefreshToken } =
      await this.userSignUpUsecase.signUp({
        nickname: signUpUserDto.nickname,
        phoneNumber: signUpUserDto.phoneNumber,
      });

    req.res.setHeader('Set-Cookie', [cookieWithRefreshToken]);

    return new UserPresenter(accountable);
  }

  @Post('sign-out')
  @UseGuards(JwtAuthGuard)
  async signOut() {
    console.log('Hello world');
  }
}
