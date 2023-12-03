import { BaseException } from '@domain/common/exception/base.exception';

export class InvalidBirthFormatException extends BaseException {
  constructor(message = '생년월일의 형식이 일치하지 않습니다.', status = 400) {
    super(message, status);
  }
}
