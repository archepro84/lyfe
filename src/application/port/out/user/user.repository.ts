import { User } from '@domain/user/user';
import { SignUpDetails } from '@application/port/in/auth/command/auth.command';
import { AuthToken } from '@domain/user/auth-token';

export interface UserRepository {
  getById(userId: string): Promise<User | null>;

  getUserByPhoneNumber(phoneNumber: string): Promise<User | null>;

  userSignUp(signUpDetails: SignUpDetails): Promise<User>;

  userSignIn(phoneNumber: string): Promise<User>;

  updateUserInfo(user: User): Promise<void>;

  updateRefreshToken(userId: string, refreshToken: AuthToken): Promise<User>;
}
