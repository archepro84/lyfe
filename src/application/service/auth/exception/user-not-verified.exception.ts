import { BaseException } from '@common/exception/base.exception';

export class UserNotVerifiedException extends BaseException {
  constructor(message = '인증되지 않은 유저입니다.', status = 403) {
    super(message, status);
  }
}
