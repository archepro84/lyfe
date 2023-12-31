import {
  Body,
  Controller,
  UseGuards,
  Request,
  Post,
  Inject,
  Put,
  Delete,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@infrastructure/common/guard/jwt-auth.guard';
import { AccessTokenHeader } from '@infrastructure/common/decorator/access-token-header.decorator';
import { CreateTopicDto } from '@infrastructure/adapter/in/web/topic/dto/create-topic.dto';
import {
  CREATE_TOPIC_USECASE,
  CreateTopicUsecase,
} from '@application/port/in/topic/create-topic.usecase';
import { User } from '@domain/user/user';
import { UpdateTopicDto } from '@infrastructure/adapter/in/web/topic/dto/update-topic.dto';
import { DeleteTopicDto } from '@infrastructure/adapter/in/web/topic/dto/delete-topic.dto';
import {
  UPDATE_TOPIC_USECASE,
  UpdateTopicUsecase,
} from '@application/port/in/topic/update-topic.usecase';
import {
  DELETE_TOPIC_USECASE,
  DeleteTopicUsecase,
} from '@application/port/in/topic/delete-topic.usecase';
import {
  FIND_ALL_TOPIC_USECASE,
  FindAllTopicUsecase,
} from '@application/port/in/topic/find-all-topic.usecase';
import {
  PaginatedTopicPresenter,
  TopicPresenter,
} from '@infrastructure/adapter/in/web/topic/presenter/topic.presenter';
import { PaginatedDto } from '@infrastructure/common/swagger/dto/paginated.dto';
import { SearchTopicDto } from '@infrastructure/adapter/in/web/topic/dto/search-topic.dto';
import {
  SEARCH_TOPIC_USECASE,
  SearchTopicUsecase,
} from '@application/port/in/topic/search-topic.usecase';
import { FindByIdDto } from '@infrastructure/common/swagger/dto/find-by-id.dto';
import {
  FIND_TOPIC_USECASE,
  FindTopicUsecase,
} from '@application/port/in/topic/find-topic.usecase';
import { Topic } from '@domain/topic/topic';

@Controller('topic')
@ApiTags('topic')
@ApiResponse({ status: 500, description: 'Internal error' })
export class TopicController {
  constructor(
    @Inject(CREATE_TOPIC_USECASE)
    private readonly createTopicUsecase: CreateTopicUsecase,
    @Inject(UPDATE_TOPIC_USECASE)
    private readonly updateTopicUsecase: UpdateTopicUsecase,
    @Inject(DELETE_TOPIC_USECASE)
    private readonly deleteTopicUsecase: DeleteTopicUsecase,
    @Inject(FIND_TOPIC_USECASE)
    private readonly findTopicUsecase: FindTopicUsecase,
    @Inject(FIND_ALL_TOPIC_USECASE)
    private readonly findAllTopicUsecase: FindAllTopicUsecase,
    @Inject(SEARCH_TOPIC_USECASE)
    private readonly searchTopicUsecase: SearchTopicUsecase,
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

  @Put()
  @UseGuards(JwtAuthGuard)
  @AccessTokenHeader()
  @ApiOperation({ summary: 'Update Topic' })
  @ApiResponse({
    status: 200,
    description: 'Return success',
    type: String,
  })
  async updateTopic(@Request() req: any, @Body() dto: UpdateTopicDto) {
    await this.updateTopicUsecase.exec({
      ...dto,
      user: req.user as User,
    });

    return 'success';
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @AccessTokenHeader()
  @ApiOperation({ summary: 'Delete Topic' })
  @ApiResponse({
    status: 200,
    description: 'Return success',
    type: String,
  })
  async deleteTopic(@Request() req: any, @Body() dto: DeleteTopicDto) {
    await this.deleteTopicUsecase.exec({
      ...dto,
      user: req.user as User,
    });

    return 'success';
  }

  @Get()
  @ApiOperation({ summary: 'Find All Topic' })
  @ApiResponse({
    status: 200,
    description: 'Return success',
    type: PaginatedTopicPresenter,
  })
  async findAllTopic(
    @Query() query: PaginatedDto,
  ): Promise<PaginatedTopicPresenter> {
    return await this.findAllTopicUsecase.exec(query);
  }

  @Get('/search')
  @ApiOperation({ summary: 'Search Topic' })
  @ApiResponse({
    status: 200,
    description: 'Return success',
    type: PaginatedTopicPresenter,
  })
  async searchTopic(
    @Query() query: SearchTopicDto,
  ): Promise<PaginatedTopicPresenter> {
    return await this.searchTopicUsecase.exec(query);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Find Topic By Id' })
  @ApiResponse({
    status: 200,
    description: 'Return success',
    type: TopicPresenter,
  })
  async findTopic(@Param() params: FindByIdDto): Promise<TopicPresenter> {
    return await this.findTopicUsecase.exec(params);
  }
}
