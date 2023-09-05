import { User } from '@domain/user/user';
import { SignUpDetails } from '@application/port/in/auth/command/auth.command';

export interface UserRepository {
  getById(userId: string): Promise<User | null>;

  getUserByPhoneNumber(phoneNumber: string): Promise<User | null>;

  userSignUp(signUpDetails: SignUpDetails): Promise<User>;

  userSignIn(phoneNumber: string): Promise<User>;

  updateUserInfo(user: User): Promise<void>;
}
