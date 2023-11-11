import {
  Body,
  Controller,
  UseGuards,
  Request,
  Post,
  Inject,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guard/jwt-auth.guard';
import { AccessTokenHeader } from '@common/decorator/access-token-header.decorator';
import { CreateTopicDto } from '@adapter/in/web/topic/dto/create-topic.dto';
import {
  CREATE_TOPIC_USECASE,
  CreateTopicUsecase,
} from '@application/port/in/topic/create-topic.usecase';
import { User } from '@domain/user/user';

@Controller('topic')
@ApiTags('topic')
@ApiResponse({ status: 500, description: 'Internal error' })
export class TopicController {
  constructor(
    @Inject(CREATE_TOPIC_USECASE)
    private readonly createTopicUsecase: CreateTopicUsecase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @AccessTokenHeader()
  @ApiOperation({ summary: 'Create Topic' })
  @ApiResponse({
    status: 201,
    description: 'Return success',
    type: String,
  })
  async createTopic(@Request() req: any, @Body() dto: CreateTopicDto) {
    await this.createTopicUsecase.exec({
      ...dto,
      user: req.user as User,
    });

    return 'success';
  }
}
