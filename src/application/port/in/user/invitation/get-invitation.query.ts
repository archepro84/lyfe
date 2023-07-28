import { Invitation } from '@domain/auth/invitation';

export interface GetInvitationQuery {
  exec(phoneNumber: string): Promise<Invitation | null>;
}

export const GET_INVITATION_QUERY = Symbol('GetInvitationQuery');
