import { Region } from '@domain/region/region';
import { Gender } from '@domain/user/user-info';
import { IsEnum, IsOptional, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserInfoDto {
  @ApiProperty({
    example: 'lyLY',
    description: '유저의 닉네임',
  })
  @IsOptional()
  @IsString()
  readonly nickname?: string;

  @ApiProperty({
    example: Gender.MALE,
    description: '유저의 성별',
  })
  @IsOptional()
  @IsEnum(Gender)
  readonly gender?: Gender;

  @ApiProperty({
    example: '1991-11-11',
    description: '유저의 생년월일',
  })
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: '생년월일의 형식이 일치하지 않습니다.',
  })
  readonly birth?: string;

  @ApiProperty({
    example: '',
    description: '유저의 거주지역',
  })
  @IsOptional()
  readonly region?: Region;
}
