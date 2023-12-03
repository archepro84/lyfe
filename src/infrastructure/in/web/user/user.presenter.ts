import { ApiProperty } from '@nestjs/swagger';
import { User } from '@domain/user/user';
import { IsObject, IsString } from 'class-validator';
import { UserInfo } from '@domain/user/user-info';

export class UserPresenter {
  @ApiProperty({
    example: '649ce895f331996dcc3cddb6',
    description: 'id',
  })
  id?: string;

  @ApiProperty({
    example: {
      nickname: 'lyLY',
      gender: 'MAN',
      birth: '1991-07-22',
      region: {
        id: '649ce895f331996dcc3cddb6',
        city: '서울특별시',
        district: '강남구',
        neighborhood: '삼성동',
      },
    },
    description: '유저의 정보',
  })
  @IsObject()
  userInfo: UserInfo;

  @ApiProperty({
    example: '+8201017778484',
    description: '유저의 핸드폰 번호',
  })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGE4MDIwNzI3ZmNiMWU5ZDc1YjRjMjUiLCJpYXQiOjE2ODg3MzI4NDAsImV4cCI6MTcyMDI2ODg0MH0.ESQ_fK3NP1uCOugFPQL-qeOJWcFWf9tNk6DECHYHhdY',
    description: '유저의 리프레시 토큰',
  })
  @IsString()
  RefreshToken: string;

  @ApiProperty({
    example: new Date('2023-06-29T02:12:37.810Z'),
    description: '회원가입 일자',
  })
  createdAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.userInfo = user.getUserInfo();
    this.phoneNumber = user.phoneNumber;
    this.createdAt = user.createdAt;
    this.RefreshToken = user.getAuthToken().token;
  }
}
