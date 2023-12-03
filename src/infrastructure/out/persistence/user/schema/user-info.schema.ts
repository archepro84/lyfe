import { Gender } from '@domain/user/user-info';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, Matches } from 'class-validator';
import { RegionEntity } from '@infrastructure/out/persistence/region/schema/region.schema';

export class UserInfoEntity {
  @ApiProperty({
    required: false,
    enum: Gender,
    description: '유저의 성별',
    example: Gender.MALE,
  })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty({
    required: false,
    type: 'string',
    description: '유저의 생년월일',
    example: '1991-11-11',
  })
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: '생년월일의 형식이 일치하지 않습니다.',
  })
  birth?: string;

  @ApiProperty({
    required: false,
    type: () => RegionEntity,
    description: '유저의 거주지역',
  })
  @IsOptional()
  region?: RegionEntity;
}
