import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsString } from 'class-validator';
import { Auth } from '@domain/auth/auth';

export class AuthPresenter {
  @ApiProperty({
    example: '649ce895f331996dcc3cddb6',
    description: 'id',
  })
  id?: string;

  @ApiProperty({
    example: '+8201017778484',
    description: '유저의 핸드폰 번호',
  })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    example: '403029',
    description: '인증 번호',
  })
  @IsString()
  authCode: string;

  @ApiProperty({
    example: new Date('2023-06-29T02:12:37.810Z'),
    description: '최초 인증 번호 발송 일자',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    example: false,
    description: '인증 완료 여부',
  })
  @IsBoolean()
  verified?: boolean;

  @ApiProperty({
    example: new Date('2023-06-29T02:12:37.810Z'),
    description: '인증 완료 날짜',
  })
  @IsDate()
  verifiedAt?: Date;

  constructor(auth: Auth) {
    this.id = auth.id;
    this.phoneNumber = auth.phoneNumber;
    this.authCode = auth.authCode;
    this.createdAt = auth.createdAt;
    this.verified = auth.verified;
    this.verifiedAt = auth.verifiedAt;
  }
}
