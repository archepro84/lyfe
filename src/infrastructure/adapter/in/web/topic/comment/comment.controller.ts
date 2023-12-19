import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  Request,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@domain/user/user';
import {
  CREATE_COMMENT_USECASE,
  CreateCommentUsecase,
} from '@application/port/in/topic/comment/usecase/create-comment.usecase';
import { JwtAuthGuard } from '@infrastructure/common/guard/jwt-auth.guard';
import { AccessTokenHeader } from '@infrastructure/common/decorator/access-token-header.decorator';
import { CreateCommentDto } from '@infrastructure/adapter/in/web/topic/comment/dto/create-comment.dto';
import {
  FIND_COMMENT_USECASE,
  FindCommentUsecase,
} from '@application/port/in/topic/comment/usecase/find-comment.usecase';
import { PaginatedDto } from '@infrastructure/common/swagger/dto/paginated.dto';
import {
  FIND_REPLY_USECASE,
  FindReplyUsecase,
} from '@application/port/in/topic/comment/usecase/find-reply.usecase';

@Controller('topic/:id/comment')
@ApiTags('Comment')
@ApiResponse({ status: 500, description: 'Internal error' })
export class CommentController {
  constructor(
    @Inject(CREATE_COMMENT_USECASE)
    private readonly createCommentUsecase: CreateCommentUsecase,
    @Inject(FIND_COMMENT_USECASE)
    private readonly findCommentUsecase: FindCommentUsecase,
    @Inject(FIND_REPLY_USECASE)
    private readonly findReplyUsecase: FindReplyUsecase,
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

  @Get()
  @ApiOperation({ summary: 'Find Paginated Comment' })
  @ApiResponse({
    status: 200,
    description: 'Return success',
    type: String,
  })
  async findComment(
    @Param('id') topicId: string,
    @Query() query: PaginatedDto,
  ) {
    return await this.findCommentUsecase.exec({
      ...query,
      topicId,
    });
  }

  @Get('/:commentId/reply')
  @ApiOperation({ summary: 'Find Paginated Reply' })
  @ApiResponse({
    status: 200,
    description: 'Return success',
    type: String,
  })
  async findReply(
    @Param('id') topicId: string,
    @Param('commentId') commentId: string,
    @Query() query: PaginatedDto,
  ) {
    return await this.findReplyUsecase.exec({
      ...query,
      topicId,
      commentId,
    });
  }
}
