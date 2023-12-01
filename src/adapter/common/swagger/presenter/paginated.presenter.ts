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
  readonly page?: number;

  @ApiProperty({
    example: '649ce793f331996dcc3cddab',
    description: '커서 위치',
  })
  readonly cursor?: string;

  readonly data: readonly T[];
}
