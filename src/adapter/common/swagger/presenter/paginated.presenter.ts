import { ApiProperty } from '@nestjs/swagger';
import { Paginated } from '@application/port/out/repository.port';

export class PaginatedPresenter<T> extends Paginated<T> {
  @ApiProperty({
    example: 1,
    description: '조회된 데이터의 수',
  })
  readonly count: number;

  @ApiProperty({
    example: 10,
    description: '한 페이지에 보여줄 데이터 수',
  })
  readonly limit: number;

  @ApiProperty({
    example: 1,
    description: '현재 페이지',
  })
  readonly page: number;

  readonly data: readonly T[];
}
