import { BaseException } from '@common/exception/base.exception';

export class VerificationLimitExceededException extends BaseException {
  constructor(
    message = [
      '인증 번호 발송 횟수를 초과하였습니다.\n',
      '매일 자정을 기준으로 발송 횟수는 초기화됩니다.',
    ].join(),
    status = 429,
  ) {
    super(message, status);
  }
}
