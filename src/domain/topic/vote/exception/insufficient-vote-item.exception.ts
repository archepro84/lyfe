import { BaseException } from '@common/exception/base.exception';

export class InsufficientVoteItemException extends BaseException {
  constructor(
    message = '투표 항목은 최소 1개 이상으로 구성되어야 합니다.',
    status = 400,
  ) {
    super(message, status);
  }
}
