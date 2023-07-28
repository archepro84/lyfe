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

  constructor(admin: Admin) {
    this.id = admin.id;
    this.email = admin.email;
    this.createdAt = admin.createdAt;
    this.updatedAt = admin.updatedAt;
  }
}
