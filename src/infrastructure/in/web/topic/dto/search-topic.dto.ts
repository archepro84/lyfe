import { ApiProperty } from '@nestjs/swagger';
import { PaginatedDto } from '@infrastructure/common/swagger/dto/paginated.dto';
import { IsOptional, IsString } from 'class-validator';

export class SearchTopicDto extends PaginatedDto {
  @ApiProperty({
    example: '키워드',
    description: '검색 키워드',
  })
  @IsString()
  @IsOptional()
  readonly keyword?: string;
}
