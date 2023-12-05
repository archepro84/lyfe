import { BaseException } from '@domain/common/exception/base.exception';

export class ContentLengthExceededException extends BaseException {
  constructor(message = '최대 길이 제한을 초과하였습니다.', status = 400) {
    super(message, status);
  }
}
