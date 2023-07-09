import { BaseException } from '@common/exception/base.exception';

export class UserAlreadyExistsException extends BaseException {
  constructor(message = '해당하는 사용자가 이미 존재합니다.', status = 409) {
    super(message, status);
  }
}
