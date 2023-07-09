export class AuthSendLog {
  id?: string;

  authId: string;

  phoneNumber: string;

  sentAt: Date;

  constructor(id: string, authId: string, phoneNumber: string, sentAt: Date) {
    this.id = id;
    this.authId = authId;
    this.phoneNumber = phoneNumber;
    this.sentAt = sentAt;
  }
}
