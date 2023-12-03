import {
  Body,
  Controller,
  Inject,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserPresenter } from '@infrastructure/in/web/user/user.presenter';
import {
  UPDATE_USER_INFO_USECASE,
  UpdateUserInfoUsecase,
} from '@application/port/in/user/update-user-info.usecase';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserInfoDto } from '@infrastructure/in/web/user/user.dto';
import { JwtAuthGuard } from '@infrastructure/common/guard/jwt-auth.guard';
import { AccessTokenHeader } from '@infrastructure/common/decorator/access-token-header.decorator';

@Controller('users')
@ApiTags('users')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(UserPresenter)
export class UserController {
  constructor(
    @Inject(UPDATE_USER_INFO_USECASE)
    private readonly updateUserInfoUsecase: UpdateUserInfoUsecase,
  ) {}

  @Patch()
  @UseGuards(JwtAuthGuard)
  @AccessTokenHeader()
  @ApiOperation({ summary: 'Update User Informations' })
  @ApiResponse({
    status: 200,
    description: 'Return success',
    type: String,
  })
  async updateUserInfo(
    @Request() req: any,
    @Body() updateUserInfoDto: UpdateUserInfoDto,
  ) {
    await this.updateUserInfoUsecase.exec({
      userId: req.user.id,
      ...updateUserInfoDto,
    });

    return 'success';
  }
}
