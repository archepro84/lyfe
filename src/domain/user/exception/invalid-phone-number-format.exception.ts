import { BaseException } from '@domain/common/exception/base.exception';

export class InvalidPhoneNumberFormatException extends BaseException {
  constructor(
    message = '핸드폰 번호의 형식이 일치하지 않습니다.',
    status = 400,
  ) {
    super(message, status);
  }
}
