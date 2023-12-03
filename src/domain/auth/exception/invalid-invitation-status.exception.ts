import { BaseException } from '@domain/common/exception/base.exception';

export class InvalidInvitationStatusException extends BaseException {
  constructor(message = '해당 초대 코드를 사용할 수 없습니다.', status = 410) {
    super(message, status);
  }
}
