import { UserRepository } from '@application/port/out/user/user.repository';
import { GetUserQuery } from '@application/port/in/user/get-user.query';
import { User } from '@domain/user/user';

export class GetUserService implements GetUserQuery {
  constructor(private readonly userRepository: UserRepository) {}

  getUserByPhoneNumber(phoneNumber: string): Promise<User> {
    return Promise.resolve(undefined);
  }
}
