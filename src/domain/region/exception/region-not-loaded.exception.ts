import { BaseException } from '@domain/common/exception/base.exception';

export class RegionNotLoadedException extends BaseException {
  constructor(message = 'Region Not Loaded Exception', status = 500) {
    super(message, status);
  }
}
