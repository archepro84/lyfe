import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SendAuthCodeDto {
  @ApiProperty({
    example: '+8201017778484',
    description: '유저의 핸드폰 번호',
  })
  @IsString()
  readonly phoneNumber: string;
}

export class VerifyAuthCodeDto {
  @ApiProperty({
    example: '+8201017778484',
    description: '유저의 핸드폰 번호',
  })
  @IsString()
  readonly phoneNumber: string;

  @ApiProperty({
    example: '123456',
    description: '인증번호',
  })
  @IsString()
  readonly authCode: string;
}

export class VerifyAuthCodeResponseDto {
  @ApiProperty({
    example: '649ce793f331996dcc3cddab',
    description: '유저 기본키',
  })
  @IsString()
  readonly token: string;
}

export class SignUpUserDto {
  @ApiProperty({
    example: 'lyLY',
    description: '유저의 닉네임',
  })
  @IsString()
  readonly nickname: string;

  @ApiProperty({
    example: '+8201017778484',
    description: '유저의 핸드폰 번호',
  })
  @IsString()
  readonly phoneNumber: string;

  @ApiProperty({
    example: 'H10QYC',
    description: '초대장 번호',
  })
  @IsString()
  readonly invitationCode: string;
}

export class SignInUserDto {
  @ApiProperty({
    example: '+8201017778484',
    description: '유저의 핸드폰 번호',
  })
  @IsString()
  readonly phoneNumber: string;
}

export class InvitationResponseDto {
  @ApiProperty({
    example: 'H10QYC',
    description: '초대장 번호',
  })
  @IsString()
  readonly invitationCode: string;
}

export class VerifyInvitationDto {
  @ApiProperty({
    example: 'H10QYC',
    description: '초대장 번호',
  })
  @IsString()
  readonly invitationCode: string;
}

export class VerifyInvitationResponseDto {
  @ApiProperty({
    example: 'H10QYC',
    description: '초대장 번호',
  })
  @IsString()
  readonly invitationCode: string;
}
