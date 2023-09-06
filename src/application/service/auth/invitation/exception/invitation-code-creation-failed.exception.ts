import { BaseException } from '@common/exception/base.exception';

export class InvitationCodeCreationFailedException extends BaseException {
  constructor(message = '초대 코드 생성에 실패하였습니다.', status = 500) {
    super(message, status);
  }
}
