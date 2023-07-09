import { Geometry } from '@domain/user/geometry';
import { User } from '@domain/user/user';

export class SignUpCommand {
  nickname: string;

  phoneNumber: string;

  location?: Geometry;

  locationUpdatedAt?: Date;

  constructor(
    nickname: string,
    phoneNumber: string,
    location: Geometry = null,
    locationUpdatedAt = null,
  ) {
    this.nickname = nickname;
    this.phoneNumber = phoneNumber;
    this.location = location;
    this.locationUpdatedAt = locationUpdatedAt;
  }
}

export class SignInCommand {
  phoneNumber: string;

  constructor(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }
}

export class AuthVerificationResponseCommand {
  constructor(
    readonly user: User,
    readonly cookieWithRefreshToken: string, // readonly cookieWithAccessToken: string,
  ) {}
}
