import { Geometry } from '@domain/user/geometry';
import { AuthToken } from '@domain/user/auth-token';

export class SignUpCommand {
  nickname: string;

  phoneNumber: string;

  invitationCode: string;

  location?: Geometry;

  locationUpdatedAt?: Date;

  constructor(
    nickname: string,
    phoneNumber: string,
    invitationCode: string,
    location: Geometry = null,
    locationUpdatedAt = null,
  ) {
    this.nickname = nickname;
    this.phoneNumber = phoneNumber;
    this.invitationCode = invitationCode;
    this.location = location;
    this.locationUpdatedAt = locationUpdatedAt;
  }
}

export class SignUpDetails {
  constructor(
    readonly nickname: string,
    readonly phoneNumber: string,
    readonly location?: Geometry,
    readonly locationUpdatedAt?: Date,
  ) {}
}

export class SignInCommand {
  phoneNumber: string;

  constructor(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }
}

export class AuthVerificationResponseCommand<T> {
  constructor(
    readonly accountable: T,
    readonly accessToken: AuthToken,
    readonly refreshToken: AuthToken,
  ) {}
}
