import { User } from '@domain/user/user';
import { SignUpDetails } from '@application/port/in/auth/command/auth.command';
import { RepositoryPort } from '@application/port/out/repository.port';

export interface UserRepository extends RepositoryPort<User> {
  getById(userId: string): Promise<User | null>;

  getUserByPhoneNumber(phoneNumber: string): Promise<User | null>;

  userSignUp(signUpDetails: SignUpDetails): Promise<User>;

  userSignIn(phoneNumber: string): Promise<User>;

  updateUserInfo(user: User): Promise<void>;
}
