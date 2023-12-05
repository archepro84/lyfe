import { BaseException } from '@domain/common/exception/base.exception';

export class EmptyContentException extends BaseException {
  constructor(message = '내용이 존재하지 않습니다.', status = 400) {
    super(message, status);
  }
}
