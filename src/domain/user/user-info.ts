import { InvalidBirthFormatException } from '@domain/user/exception/invalid-birth-format.exception';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export class UserInfo {
  private gender?: Gender;
  private birth?: string;
  private regionId?: string;

  constructor(
    gender: Gender = null,
    birth: string = null,
    regionId: string = null,
  ) {
    this.setGender(gender);
    this.setBirth(birth);
    this.regionId = regionId;
  }

  setGender(gender: Gender) {
    this.gender = gender;
  }

  getGender(): Gender {
    return this.gender;
  }

  setBirth(birth: string) {
    if (!birth) {
      this.birth = null;
      return;
    }
    if (!birth.match(/^\d{4}-\d{2}-\d{2}$/))
      throw new InvalidBirthFormatException();
    this.birth = birth;
  }

  getBirth(): string {
    return this.birth;
  }

  setRegionId(regionId: string) {
    this.regionId = regionId;
  }

  getRegionId(): string {
    return this.regionId;
  }

  static fromObject(obj: any): UserInfo {
    return new UserInfo(obj.gender, obj.birth, obj.region);
  }
}
