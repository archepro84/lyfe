import { Geometry } from '@domain/user/geometry';
import { AuthToken } from '@domain/user/auth-token';

export class SignUpCommand {
  nickname: string;

  phoneNumber: string;

  invitationCode: string;

  constructor(nickname: string, phoneNumber: string, invitationCode: string) {
    this.nickname = nickname;
    this.phoneNumber = phoneNumber;
    this.invitationCode = invitationCode;
  }
}

export class SignUpDetails {
  constructor(readonly nickname: string, readonly phoneNumber: string) {}
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
