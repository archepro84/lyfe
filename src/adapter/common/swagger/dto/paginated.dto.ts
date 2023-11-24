import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginatedDto {
  @ApiProperty({
    example: 1,
    description: '현재 페이지',
  })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  readonly page?: number;

  @ApiProperty({
    example: 10,
    description: '한 페이지에 보여줄 데이터 수',
  })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  readonly limit?: number;
}
