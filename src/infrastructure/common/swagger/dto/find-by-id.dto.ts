import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindByIdDto {
  @ApiProperty({
    example: '649ce793f331996dcc3cddab',
    description: 'id',
  })
  @IsString()
  public readonly id: string;
}
