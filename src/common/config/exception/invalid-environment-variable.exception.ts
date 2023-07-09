import { BaseException } from '@common/exception/base.exception';

export class InvalidEnvironmentVariableException extends BaseException {
  constructor(message = 'env의 형식이 일치하지 않습니다.', status = 500) {
    super(message, status);
  }
}
