import { DynamicModule, Module } from '@nestjs/common';
import { RepositoriesModule } from '@adapter/out/persistence/repositories.module';
import { BcryptAdapter } from '@adapter/security/bcrypt/bcrypt.adapter';
import { BcryptModule } from '@adapter/security/bcrypt/bcrypt.module';
import { LoggerAdapter } from '@adapter/common/logger/logger.adapter';
import { LoggerModule } from '@adapter/common/logger/logger.module';
import { IssueInvitationService } from '@application/service/auth/invitation/issue-invitation.service';
import { ISSUE_INVITATION_USECASE } from '@application/port/in/auth/invitation/issue-invitation.usecase';
import { InvitationMongoRepository } from '@adapter/out/persistence/auth/invitation/invitation.mongo.repository';

@Module({
  imports: [BcryptModule, RepositoriesModule, LoggerModule],
})
export class InvitationServiceProxyModule {
  static register(): DynamicModule {
    return {
      module: InvitationServiceProxyModule,
      providers: [
        {
          inject: [LoggerAdapter, InvitationMongoRepository, BcryptAdapter],
          provide: ISSUE_INVITATION_USECASE,
          useFactory: (
            logger: LoggerAdapter,
            invitationMongoRepository: InvitationMongoRepository,
            bcryptAdapter: BcryptAdapter,
          ) =>
            new IssueInvitationService(
              logger,
              invitationMongoRepository,
              bcryptAdapter,
            ),
        },
      ],
      exports: [ISSUE_INVITATION_USECASE],
    };
  }
}
