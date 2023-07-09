import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('ping')
@ApiResponse({ status: 500, description: 'Internal error' })
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Ping' })
  @ApiResponse({
    status: 200,
    description: 'Return success',
  })
  ping(): string {
    return 'Ping';
  }
}
