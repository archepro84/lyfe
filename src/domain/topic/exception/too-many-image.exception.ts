import { BaseException } from '@domain/common/exception/base.exception';

export class TooManyImageException extends BaseException {
  constructor(
    message = '이미지 업로드가 가능한 최대 갯수를 초과하였습니다.',
    status = 400,
  ) {
    super(message, status);
  }
}
