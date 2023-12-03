import { BaseException } from '@domain/common/exception/base.exception';

export class AuthenticationFailedException extends BaseException {
  constructor(message = '로그인에 실패하였습니다.', status = 401) {
    super(message, status);
  }
}
