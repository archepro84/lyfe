import { BaseException } from '@domain/common/exception/base.exception';

export class UnauthorizedException extends BaseException {
  constructor(message = 'Unauthorized Exception', status = 401) {
    super(message, status);
  }
}
