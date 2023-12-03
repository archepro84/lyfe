import { Controller, Get, Inject, Query } from '@nestjs/common';
import {
  GET_REGION_EXACT_LOCATION_QUERY,
  GetRegionExactLocationQuery,
} from '@application/port/in/region/get-region-exact-location.query';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserPresenter } from '@infrastructure/in/web/user/user.presenter';
import { GetRegionDto } from '@infrastructure/in/web/region/region.dto';
import { RegionPresenter } from '@infrastructure/in/web/region/region.presenter';

@Controller('region')
@ApiTags('region')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(UserPresenter)
export class RegionController {
  constructor(
    @Inject(GET_REGION_EXACT_LOCATION_QUERY)
    private readonly getRegionExactLocationQuery: GetRegionExactLocationQuery,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get Region' })
  @ApiResponse({
    status: 200,
    description: 'Return Region',
    type: [RegionPresenter],
  })
  async getRegion(@Query() query: GetRegionDto): Promise<RegionPresenter> {
    return new RegionPresenter(
      await this.getRegionExactLocationQuery.exec(query),
    );
  }
}
