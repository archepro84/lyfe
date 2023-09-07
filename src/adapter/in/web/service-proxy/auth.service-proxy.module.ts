import { DynamicModule, Module } from '@nestjs/common';
import { SnsAdapter } from '@adapter/out/messaging/sns/sns.adapter';
import { SEND_VERIFICATION_USECASE } from '@application/port/in/auth/send-verification.usecase';
import { SendVerificationService } from '@application/service/auth/send-verification.service';
import { SnsModule } from '@adapter/out/messaging/sns/sns.module';
import { RepositoriesModule } from '@adapter/out/persistence/repositories.module';
import { AuthMongoRepository } from '@adapter/out/persistence/auth/auth.mongo.repository';
import { AuthSendLogMongoRepository } from '@adapter/out/persistence/auth/auth-send-log.mongo.repository';
import { VERIFICATION_AUTH_CODE_USECASE } from '@application/port/in/auth/verification-auth-code.usecase';
import { VerificationAuthCodeService } from '@application/service/auth/verification-auth-code.service';
import { SIGN_UP_USECASE } from '@application/port/in/auth/sign-up.usecase';
import { UserMongoRepository } from '@adapter/out/persistence/user/user.mongo.repository';
import { SignUpService } from '@application/service/auth/sign-up.service';
import { BcryptAdapter } from '@adapter/security/bcrypt/bcrypt.adapter';
import { BcryptModule } from '@adapter/security/bcrypt/bcrypt.module';
import { EnvironmentConfigService } from '@common/config/environment-config.service';
import { JwtAdapter } from '@adapter/security/jwt/jwt.adapter';
import { TOKEN_USECASE } from '@application/port/in/auth/token/token.usecase';
import { TokenService } from '@application/service/auth/token/token.service';
import { EnvironmentConfigModule } from '@common/config/environment-config.module';
import { JwtModule } from '@adapter/security/jwt/jwt.module';
import { SIGN_IN_USECASE } from '@application/port/in/auth/sign-in.usecase';
import { SignInService } from '@application/service/auth/sign-in.service';
import { LoggerAdapter } from '@adapter/common/logger/logger.adapter';
import { LoggerModule } from '@adapter/common/logger/logger.module';
import { InvitationMongoRepository } from '@adapter/out/persistence/auth/invitation/invitation.mongo.repository';
import { User } from '@domain/user/user';

@Module({
  imports: [
    BcryptModule,
    RepositoriesModule,
    SnsModule,
    EnvironmentConfigModule,
    JwtModule,
    LoggerModule,
  ],
})
export class AuthServiceProxyModule {
  static register(): DynamicModule {
    return {
      module: AuthServiceProxyModule,
      providers: [
        {
          inject: [
            UserMongoRepository,
            EnvironmentConfigService,
            JwtAdapter,
            BcryptAdapter,
          ],
          provide: TOKEN_USECASE,
          useFactory: (
            tokenRepository: UserMongoRepository,
            environmentConfigService: EnvironmentConfigService,
            jwtAdapter: JwtAdapter,
            bcryptAdapter: BcryptAdapter,
          ) =>
            new TokenService(
              tokenRepository,
              environmentConfigService,
              jwtAdapter,
              bcryptAdapter,
            ),
        },
        {
          inject: [UserMongoRepository, TOKEN_USECASE],
          provide: SIGN_IN_USECASE,
          useFactory: (
            userRepository: UserMongoRepository,
            tokenUsecase: TokenService<User>,
          ) => new SignInService(userRepository, tokenUsecase),
        },
        {
          inject: [
            AuthMongoRepository,
            AuthSendLogMongoRepository,
            SnsAdapter,
            BcryptAdapter,
            LoggerAdapter,
          ],
          provide: SEND_VERIFICATION_USECASE,
          useFactory: (
            authRepository: AuthMongoRepository,
            authSendLogRepository: AuthSendLogMongoRepository,
            snsAdapter: SnsAdapter,
            bcryptAdapter: BcryptAdapter,
            loggerAdapter: LoggerAdapter,
          ) =>
            new SendVerificationService(
              authRepository,
              authSendLogRepository,
              snsAdapter,
              bcryptAdapter,
              loggerAdapter,
            ),
        },
        {
          inject: [
            AuthMongoRepository,
            AuthSendLogMongoRepository,
            UserMongoRepository,
            BcryptAdapter,
            TOKEN_USECASE,
            SIGN_IN_USECASE,
          ],
          provide: VERIFICATION_AUTH_CODE_USECASE,
          useFactory: (
            authRepository: AuthMongoRepository,
            authSendLogMongoRepository: AuthSendLogMongoRepository,
            userRepository: UserMongoRepository,
            bcryptAdapter: BcryptAdapter,
            tokenUsecase: TokenService<User>,
            signInUsecase: SignInService<User>,
          ) =>
            new VerificationAuthCodeService(
              authRepository,
              authSendLogMongoRepository,
              userRepository,
              bcryptAdapter,
              tokenUsecase,
              signInUsecase,
            ),
        },
        {
          inject: [
            UserMongoRepository,
            AuthMongoRepository,
            InvitationMongoRepository,
            TOKEN_USECASE,
            SIGN_IN_USECASE,
          ],
          provide: SIGN_UP_USECASE,
          useFactory: (
            userRepository: UserMongoRepository,
            authRepository: AuthMongoRepository,
            invitationRepository: InvitationMongoRepository,
            tokenUsecase: TokenService<User>,
            signInUsecase: SignInService<User>,
          ) =>
            new SignUpService(
              userRepository,
              authRepository,
              invitationRepository,
              tokenUsecase,
              signInUsecase,
            ),
        },
      ],
      exports: [
        TOKEN_USECASE,
        SEND_VERIFICATION_USECASE,
        VERIFICATION_AUTH_CODE_USECASE,
        SIGN_UP_USECASE,
        SIGN_IN_USECASE,
      ],
    };
  }
}
