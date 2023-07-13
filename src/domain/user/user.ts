import { Geometry } from './geometry';
import { AuthToken } from '@domain/user/auth-token';

export class User {
  readonly id?: string;

  readonly nickname: string;

  readonly phoneNumber: string;

  location?: Geometry;

  locationUpdatedAt?: Date;

  verifiedAt?: Date;

  authToken?: AuthToken;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  deletedAt?: Date;

  constructor(
    id: string,
    nickname: string,
    phoneNumber: string,
    location: Geometry = null,
    locationUpdatedAt = null,
    verifiedAt: Date = null,
    authToken: AuthToken = null,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date = null,
  ) {
    this.id = id;
    this.nickname = nickname;
    this.phoneNumber = phoneNumber;
    this.location = location;
    this.locationUpdatedAt = locationUpdatedAt;
    this.verifiedAt = verifiedAt;
    this.authToken = authToken;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  setLocation(location: Geometry) {
    this.location = location;
    this.locationUpdatedAt = new Date();
  }

  setVerifiedAt(date: Date) {
    this.verifiedAt = date;
  }

  setToken(authToken: AuthToken) {
    this.authToken = authToken;
  }
}
