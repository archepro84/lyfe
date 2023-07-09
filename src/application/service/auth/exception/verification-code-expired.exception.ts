import { BaseException } from '@common/exception/base.exception';

export class VerificationCodeExpiredException extends BaseException {
  constructor(
    message = '인증 번호가 만료되었습니다. 새로운 인증 번호를 발급해주세요.',
    status = 410,
  ) {
    super(message, status);
  }
}
