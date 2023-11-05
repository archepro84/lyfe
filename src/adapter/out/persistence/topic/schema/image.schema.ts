import { ApiProperty } from '@nestjs/swagger';

export class ImageEntity {
  @ApiProperty({
    required: true,
    type: 'string',
    description: '이미지 URL',
    example: 'https://nestjs.com/img/logo-small.svg',
  })
  url: string;
}
