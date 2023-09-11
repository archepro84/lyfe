import { Domain } from '@domain/domain';

export class Auth extends Domain {
  readonly id: string;

  readonly phoneNumber: string;

  readonly authCode: string;

  readonly createdAt: Date;

  verified: boolean;

  verifiedAt?: Date;

  constructor(
    id: string,
    phoneNumber: string,
    authCode: string,
    createdAt: Date,
    verified = false,
    verifiedAt: Date,
  ) {
    super();

    this.id = id;
    this.phoneNumber = phoneNumber;
    this.authCode = authCode;
    this.createdAt = createdAt;
    this.verified = verified;

    this.verifiedAt = verifiedAt;
  }
}
