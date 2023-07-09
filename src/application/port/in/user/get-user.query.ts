import { User } from '@domain/user/user';

export interface GetUserQuery {
  getUserByPhoneNumber(phoneNumber: string): Promise<User>;
}

export const GET_USER_QUERY = Symbol('GetUserQuery');
