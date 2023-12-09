import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CREATE_TOPIC_USECASE } from '@application/port/in/topic/create-topic.usecase';
import { User } from '@domain/user/user';
import {
  CREATE_COMMENT_USECASE,
  CreateCommentUsecase,
} from '@application/port/in/topic/comment/usecase/create-comment.usecase';
import { JwtAuthGuard } from '@infrastructure/common/guard/jwt-auth.guard';
import { AccessTokenHeader } from '@infrastructure/common/decorator/access-token-header.decorator';
import { CreateCommentDto } from '@infrastructure/adapter/in/web/topic/comment/dto/create-comment.dto';

@Controller('topic/:id/comment')
@ApiTags('Comment')
@ApiResponse({ status: 500, description: 'Internal error' })
export class CommentController {
  constructor(
    @Inject(CREATE_COMMENT_USECASE)
    private readonly createCommentUsecase: CreateCommentUsecase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @AccessTokenHeader()
  @ApiOperation({ summary: 'Create Comment' })
  @ApiResponse({
    status: 201,
    description: 'Return success',
    type: String,
  })
  async createComment(
    @Request() req: any,
    @Param('id') topicId: string,
    @Body() dto: CreateCommentDto,
  ) {
    await this.createCommentUsecase.exec({
      ...dto,
      topicId: topicId,
      user: req.user as User,
    });

    return 'success';
  }
}
