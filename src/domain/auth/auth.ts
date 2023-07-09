export class Auth {
  id?: string;

  phoneNumber: string;

  authCode: string;

  createdAt: Date;

  verified?: boolean;

  verifiedAt?: Date;

  constructor(
    id: string,
    phoneNumber: string,
    authCode: string,
    createdAt: Date,
    verified = false,
    verifiedAt: Date,
  ) {
    this.id = id;
    this.phoneNumber = phoneNumber;
    this.authCode = authCode;
    this.createdAt = createdAt;
    this.verified = verified;
    this.verifiedAt = verifiedAt;
  }
}
