import { BaseException } from '@domain/common/exception/base.exception';

export class InvalidVerificationCodeException extends BaseException {
  constructor(message = '입력된 인증 번호가 일치하지 않습니다.', status = 400) {
    super(message, status);
  }
}
