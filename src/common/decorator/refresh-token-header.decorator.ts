import { ApiHeader } from '@nestjs/swagger';

export function RefreshTokenHeader() {
  return ApiHeader({
    name: 'Cookie',
    description: 'RefreshToken=YOUR_JWT_TOKEN',
  });
}
