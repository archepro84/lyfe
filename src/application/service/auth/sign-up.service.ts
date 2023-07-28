import { UserRepository } from '@application/port/out/user/user.repository';
import { UserAlreadyExistsException } from 'src/application/service/auth/exception/user-already-exists.exception';
import { AuthRepository } from '@application/port/out/auth/auth.repository';
import { UserNotVerifiedException } from '@application/service/auth/exception/user-not-verified.exception';
import { SignUpUsecase } from '@application/port/in/auth/sign-up.usecase';
import {
  AuthVerificationResponseCommand,
  SignUpCommand,
} from '@application/port/in/auth/command/auth.command';
import { TokenUsecase } from '@application/port/in/auth/token/token.usecase';
import { SignInUsecase } from '@application/port/in/auth/sign-in.usecase';
import { User } from '@domain/user/user';

export class SignUpService implements SignUpUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authRepository: AuthRepository,
    private readonly tokenUsecase: TokenUsecase,
    private readonly signInUsecase: SignInUsecase,
  ) {}

  async signUp(
    signUpCommand: SignUpCommand,
  ): Promise<AuthVerificationResponseCommand<User>> {
    const auth = await this.authRepository.getAuth(signUpCommand.phoneNumber);
    if (auth.verified === false) throw new UserNotVerifiedException();

    const user = await this.userRepository.getUserByPhoneNumber(
      signUpCommand.phoneNumber,
    );
    if (user) throw new UserAlreadyExistsException();

    await this.userRepository.userSignUp(signUpCommand);

    return await this.signInUsecase.signIn({
      phoneNumber: signUpCommand.phoneNumber,
    });
  }
}
