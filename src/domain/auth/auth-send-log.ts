import { Domain } from '@domain/domain';

export class AuthSendLog extends Domain {
  id?: string;

  authId: string;

  phoneNumber: string;

  sentAt: Date;

  constructor(id: string, authId: string, phoneNumber: string, sentAt: Date) {
    super();

    this.id = id;
    this.authId = authId;
    this.phoneNumber = phoneNumber;
    this.sentAt = sentAt;
  }
}
