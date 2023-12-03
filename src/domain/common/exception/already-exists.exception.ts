import { BaseException } from '@domain/common/exception/base.exception';

export class AlreadyExistsException extends BaseException {
  constructor(message = 'Already Exists Exception', status = 409) {
    super(message, status);
  }
}
