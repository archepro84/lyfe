import { DynamicModule, Module } from '@nestjs/common';
import { RepositoriesModule } from '@adapter/out/persistence/repositories.module';
import { UserMongoRepository } from '@adapter/out/persistence/user/user.mongo.repository';
import { AdminMongoRepository } from '@adapter/out/persistence/admin/admin.mongo.repository';
import { IssueInvitationService } from '@application/service/auth/invitation/issue-invitation.service';
import { ISSUE_INVITATION_USECASE } from '@application/port/in/auth/invitation/issue-invitation.usecase';
import { ADMIN_ISSUE_INVITATION_USECASE } from '@application/port/in/admin/admin-issue-invitation.usecase';
import { AdminIssueInvitationService } from '@application/service/admin/admin-issue-invitation.service';
import { InvitationServiceProxyModule } from '@adapter/in/web/service-proxy/invitation.service-proxy.module';
import { SIGN_UP_ADMIN_USECASE } from '@application/port/in/admin/sign-up-admin.usecase';
import { BcryptAdapter } from '@adapter/security/bcrypt/bcrypt.adapter';
import { BcryptPort } from '@application/port/security/bcrypt/bcrypt.port';
import { SignUpAdminService } from '@application/service/admin/sign-up-admin.service';
import { BcryptModule } from '@adapter/security/bcrypt/bcrypt.module';
import { EnvironmentConfigService } from '@common/config/environment-config.service';
import { JwtAdapter } from '@adapter/security/jwt/jwt.adapter';
import { ADMIN_TOKEN_USECASE } from '@application/port/in/auth/token/token.usecase';
import { TokenService } from '@application/service/auth/token/token.service';
import { EnvironmentConfigModule } from '@common/config/environment-config.module';
import { JwtModule } from '@adapter/security/jwt/jwt.module';
import { SIGN_IN_ADMIN_USECASE } from '@application/port/in/admin/sign-in-admin.usecase';
import { SignInAdminService } from '@application/service/admin/sign-in-admin.service';
import { Admin } from '@domain/admin/admin';

@Module({
  imports: [
    BcryptModule,
    EnvironmentConfigModule,
    JwtModule,
    RepositoriesModule,
    InvitationServiceProxyModule.register(),
  ],
})
export class AdminServiceProxyModule {
  static register(): DynamicModule {
    return {
      module: AdminServiceProxyModule,
      providers: [
        {
          inject: [
            AdminMongoRepository,
            EnvironmentConfigService,
            JwtAdapter,
            BcryptAdapter,
          ],
          provide: ADMIN_TOKEN_USECASE,
          useFactory: (
            tokenRepository: AdminMongoRepository,
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
          inject: [AdminMongoRepository, BcryptAdapter, ADMIN_TOKEN_USECASE],
          provide: SIGN_IN_ADMIN_USECASE,
          useFactory: (
            adminRepository: AdminMongoRepository,
            bcryptPort: BcryptPort,
            tokenUsecase: TokenService<Admin>,
          ) =>
            new SignInAdminService(adminRepository, bcryptPort, tokenUsecase),
        },
        {
          inject: [AdminMongoRepository, BcryptAdapter],
          provide: SIGN_UP_ADMIN_USECASE,
          useFactory: (
            adminRepository: AdminMongoRepository,
            bcryptPort: BcryptPort,
          ) => new SignUpAdminService(adminRepository, bcryptPort),
        },
        {
          inject: [
            AdminMongoRepository,
            UserMongoRepository,
            ISSUE_INVITATION_USECASE,
          ],
          provide: ADMIN_ISSUE_INVITATION_USECASE,
          useFactory: (
            adminRepository: AdminMongoRepository,
            userRepository: UserMongoRepository,
            issueInvitationUsecase: IssueInvitationService,
          ) =>
            new AdminIssueInvitationService(
              adminRepository,
              userRepository,
              issueInvitationUsecase,
            ),
        },
      ],
      exports: [
        ADMIN_TOKEN_USECASE,
        SIGN_IN_ADMIN_USECASE,
        SIGN_UP_ADMIN_USECASE,
        ADMIN_ISSUE_INVITATION_USECASE,
      ],
    };
  }
}
