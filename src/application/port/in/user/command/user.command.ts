export class UpdateUserProfileCommand {
  nickname: string;

  constructor(nickname: string) {
    this.nickname = nickname;
  }
}
