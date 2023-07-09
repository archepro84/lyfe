import { User } from '@domain/user/user';
import { UpdateUserProfileCommand } from '@application/port/in/user/command/user.command';
import { SignUpCommand } from '@application/port/in/auth/command/auth.command';
import { RefreshToken } from '@domain/user/refresh-token';

export interface UserRepository {
  getUser(userId: string): Promise<User | null>;

  getUserByPhoneNumber(phoneNumber: string): Promise<User | null>;

  userSignUp(userSignUpCommand: SignUpCommand): Promise<User>;

  userSignIn(phoneNumber: string): Promise<User>;

  updateUserProfile(
    userId: string,
    updateUserProfileCommand: UpdateUserProfileCommand,
  ): Promise<User>;

  updateRefreshToken(userId: string, refreshToken: RefreshToken): Promise<User>;
}
