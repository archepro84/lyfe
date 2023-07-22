export enum InvitationType {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum InvitationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export class Invitation {
  readonly id: string;
  readonly invitationType: InvitationType;
  readonly inviterId: string;
  readonly invitationCode: string;
  readonly inviteePhoneNumber: string;

  private invitationStatus: InvitationStatus = InvitationStatus.PENDING;

  constructor(
    id: string,
    invitationType: InvitationType,
    inviterId: string,
    invitationCode: string,
    inviteePhoneNumber: string,
  ) {
    this.id = id;
    this.invitationType = invitationType;
    this.inviterId = inviterId;
    this.invitationCode = invitationCode;
    this.inviteePhoneNumber = inviteePhoneNumber;
  }

  setInvitationStatus(invitationStatus: InvitationStatus) {
    this.invitationStatus = invitationStatus;
  }

  getInvitationStatus(): InvitationStatus {
    return this.invitationStatus;
  }
}