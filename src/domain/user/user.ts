import { AuthToken } from '@domain/user/auth-token';
import { UserInfo } from '@domain/user/user-info';
import { InvalidPhoneNumberFormatException } from '@domain/user/exception/invalid-phone-number-format.exception';
import { Accountable } from '@domain/auth/accountable';
import { Domain } from '@domain/domain';

export type UserRequiredProps = Readonly<
  Required<{
    id: string;
    nickname: string;
    userInfo: UserInfo;
    phoneNumber: string;
  }>
>;

export type UserOptionalProps = Readonly<
  Partial<{
    locationUpdatedAt: Date;
    verifiedAt: Date;
    authToken: AuthToken;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
  }>
>;

export type UserProps = UserRequiredProps & UserOptionalProps;

export class User extends Domain implements Accountable {
  readonly id?: string;
  readonly phoneNumber: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  private nickname: string;
  private userInfo: UserInfo;
  private locationUpdatedAt?: Date = new Date();
  private verifiedAt: Date = new Date();
  private authToken?: AuthToken;
  private deletedAt: Date = new Date();

  constructor(
    id: string,
    nickname: string,
    userInfo: UserInfo,
    phoneNumber: string,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    authToken: AuthToken = null,
  ) {
    super();

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

  setNickname(nickname: string) {
    this.nickname = nickname;
  }

  getNickname(): string {
    return this.nickname;
  }

  setUserInfo(userInfo: UserInfo) {
    this.userInfo = userInfo;
  }

  getUserInfo(): UserInfo {
    return this.userInfo;
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

  public static newInstance(
    nickname: string,
    userInfo: UserInfo,
    phoneNumber: string,
  ): User {
    return new User(null, nickname, userInfo, phoneNumber);
  }
}

export class UserFactory {
  static newInstance(props: UserProps): User {
    return new User(
      props.id ?? null,
      props.nickname,
      props.userInfo,
      props.phoneNumber,
    );
  }
}
