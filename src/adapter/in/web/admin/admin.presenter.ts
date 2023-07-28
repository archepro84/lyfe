import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Admin } from '@domain/admin/admin';

export class AdminPresenter {
  @ApiProperty({
    example: '649ce895f331996dcc3cddb6',
    description: 'id',
  })
  id?: string;

  @ApiProperty({
    example: 'archepro84@gmail.com',
    description: '이메일',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: new Date('2023-06-29T02:12:37.810Z'),
    description: '어드민 회원가입 일자',
  })
  createdAt: Date;

  @ApiProperty({
    example: new Date('2023-06-29T02:12:37.810Z'),
    description: '어드민 수정 일자',
  })
  updatedAt: Date;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGE4MDIwNzI3ZmNiMWU5ZDc1YjRjMjUiLCJpYXQiOjE2ODg3MzI4NDAsImV4cCI6MTcyMDI2ODg0MH0.ESQ_fK3NP1uCOugFPQL-qeOJWcFWf9tNk6DECHYHhdY',
    description: '인증 토큰',
  })
  @IsString()
  token: string;

  constructor(admin: Admin) {
    this.id = admin.id;
    this.email = admin.email;
    this.createdAt = admin.createdAt;
    this.updatedAt = admin.updatedAt;
    this.token = admin.getAuthToken().token;
  }
}
