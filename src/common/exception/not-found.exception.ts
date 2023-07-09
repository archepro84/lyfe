import { BaseException } from '@common/exception/base.exception';

export class NotFoundException extends BaseException {
  constructor(message = 'Not Found', status = 404) {
    super(message, status);
  }
}
