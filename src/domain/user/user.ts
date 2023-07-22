import { Geometry } from './geometry';
import { AuthToken } from '@domain/user/auth-token';
import { UserInfo } from '@domain/user/user-info';
import { InvalidPhoneNumberFormatException } from '@domain/user/exception/invalid-phone-number-format.exception';

export class User {
  readonly id?: string;
  readonly nickname: string;
  readonly userInfo: UserInfo;
  readonly phoneNumber: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  private location: Geometry = null;
  private locationUpdatedAt?: Date = new Date();
  private verifiedAt: Date = new Date();
  private authToken?: AuthToken;
  private deletedAt: Date = new Date();

  constructor(
    id: string,
    nickname: string,
    userInfo: UserInfo,
    phoneNumber: string,
    createdAt: Date,
    updatedAt: Date,
    authToken: AuthToken = null,
  ) {
    this.id = id;
    this.nickname = nickname;
    this.userInfo = userInfo;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

    this.authToken = authToken;

    if (!phoneNumber.match(/^\+\d{1,3}\d{1,15}$/))
      throw new InvalidPhoneNumberFormatException();
    this.phoneNumber = phoneNumber;
  }

  setLocation(location: Geometry) {
    this.location = location;
  }

  getLocation(): Geometry {
    return this.location;
  }

  setLocationUpdatedAt(locationUpdatedAt: Date) {
    this.locationUpdatedAt = locationUpdatedAt;
  }

  getLocationUpdatedAt(): Date {
    return this.locationUpdatedAt;
  }

  setVerifiedAt(verifiedAt: Date) {
    this.verifiedAt = verifiedAt;
  }

  getVerifiedAt(): Date {
    return this.verifiedAt;
  }

  setAuthToken(authToken: AuthToken) {
    this.authToken = authToken;
  }

  getAuthToken(): AuthToken {
    return this.authToken;
  }

  setDeletedAt(deletedAt: Date) {
    this.deletedAt = deletedAt;
  }

  getDeletedAt(): Date {
    return this.deletedAt;
  }
}
