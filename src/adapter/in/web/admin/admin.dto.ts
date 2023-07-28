import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignUpAdminDto {
  @ApiProperty({
    example: 'archepro84@gmail.com',
    description: '어드민 이메일',
  })
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'q1w2e3r4^^^^!#@',
    description: '어드민 비밀번호',
  })
  @IsString()
  readonly password: string;
}
