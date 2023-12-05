import { BaseException } from '@domain/common/exception/base.exception';

export class InappropriateContentException extends BaseException {
  constructor(message = '부적절한 내용이 포함되어있습니다.', status = 400) {
    super(message, status);
  }
}
