import { ApiHeader } from '@nestjs/swagger';

export function AccessTokenHeader() {
  return ApiHeader({
    name: 'Cookie',
    description: 'AccessToken=YOUR_JWT_TOKEN',
  });
}
