import { ApiProperty } from '@nestjs/swagger';
import { User } from '@domain/user/user';
import { IsString } from 'class-validator';

export class UserPresenter {
  @ApiProperty({
    example: '649ce895f331996dcc3cddb6',
    description: 'id',
  })
  id?: string;

  @ApiProperty({
    example: 'lyLY',
    description: '유저의 닉네임',
  })
  @IsString()
  nickname: string;

  @ApiProperty({
    example: '+8201017778484',
    description: '유저의 핸드폰 번호',
  })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGE4MDIwNzI3ZmNiMWU5ZDc1YjRjMjUiLCJpYXQiOjE2ODg3MzI4NDAsImV4cCI6MTcyMDI2ODg0MH0.ESQ_fK3NP1uCOugFPQL-qeOJWcFWf9tNk6DECHYHhdY',
    description: '유저의 토큰',
  })
  @IsString()
  token: string;

  @ApiProperty({
    example: new Date('2023-06-29T02:12:37.810Z'),
    description: '회원가입 일자',
  })
  createdAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.nickname = user.nickname;
    this.phoneNumber = user.phoneNumber;
    this.createdAt = user.createdAt;
    this.token = user.authToken.token;
  }
}
