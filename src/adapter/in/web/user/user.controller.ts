import { Controller, Get, Inject, Param } from '@nestjs/common';
import { UserPresenter } from '@adapter/in/web/user/user.presenter';
import {
  UPDATE_USER_INFO_USECASE,
  UpdateUserInfoUsecase,
} from '@application/port/in/user/update-user-info.usecase';
import {
  SIGN_IN_USECASE,
  SignInUsecase,
} from '@application/port/in/auth/sign-in.usecase';
import {
  GET_USER_QUERY,
  GetUserQuery,
} from '@application/port/in/user/get-user.query';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(UserPresenter)
export class UserController {
  constructor(
    @Inject(UPDATE_USER_INFO_USECASE)
    private readonly updateUserProfileUsecase: UpdateUserInfoUsecase,
    @Inject(SIGN_IN_USECASE)
    private readonly userSignInUsecase: SignInUsecase,
    @Inject(GET_USER_QUERY)
    private readonly getUserQuery: GetUserQuery,
  ) {}

  @Get(':id')
  async getTest(@Param('id') userId: string) {
    console.log('Hello world');
    return 'Hello';
  }
}
