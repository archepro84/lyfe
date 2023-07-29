import { User } from '@domain/user/user';
import { UpdateUserInfoCommand } from '@application/port/in/user/command/update-user-info.command';
import { SignUpDetails } from '@application/port/in/auth/command/auth.command';
import { AuthToken } from '@domain/user/auth-token';

export interface UserRepository {
  getById(userId: string): Promise<User | null>;

  getUserByPhoneNumber(phoneNumber: string): Promise<User | null>;

  userSignUp(signUpDetails: SignUpDetails): Promise<User>;

  userSignIn(phoneNumber: string): Promise<User>;

  updateUserProfile(
    userId: string,
    updateUserInfoCommand: UpdateUserInfoCommand,
  ): Promise<void>;

  updateRefreshToken(userId: string, refreshToken: AuthToken): Promise<User>;
}
