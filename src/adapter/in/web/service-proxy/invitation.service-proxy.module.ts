import { DynamicModule, Module } from '@nestjs/common';
import { RepositoriesModule } from '@adapter/out/persistence/repositories.module';
import { BcryptModule } from '@adapter/security/bcrypt/bcrypt.module';
import { LoggerAdapter } from '@adapter/common/logger/logger.adapter';
import { LoggerModule } from '@adapter/common/logger/logger.module';
import { IssueInvitationService } from '@application/service/auth/invitation/issue-invitation.service';
import { ISSUE_INVITATION_USECASE } from '@application/port/in/auth/invitation/issue-invitation.usecase';
import { InvitationMongoRepository } from '@adapter/out/persistence/auth/invitation/invitation.mongo.repository';
import { GET_INVITATION_QUERY } from '@application/port/in/user/invitation/get-invitation.query';
import { GetInvitationService } from '@application/service/auth/invitation/get-invitation.service';

@Module({
  imports: [BcryptModule, RepositoriesModule, LoggerModule],
})
export class InvitationServiceProxyModule {
  static register(): DynamicModule {
    return {
      module: InvitationServiceProxyModule,
      providers: [
        {
          inject: [LoggerAdapter, InvitationMongoRepository],
          provide: ISSUE_INVITATION_USECASE,
          useFactory: (
            logger: LoggerAdapter,
            invitationMongoRepository: InvitationMongoRepository,
          ) => new IssueInvitationService(logger, invitationMongoRepository),
        },
        {
          inject: [LoggerAdapter, InvitationMongoRepository],
          provide: GET_INVITATION_QUERY,
          useFactory: (
            logger: LoggerAdapter,
            invitationMongoRepository: InvitationMongoRepository,
          ) => new GetInvitationService(logger, invitationMongoRepository),
        },
      ],
      exports: [ISSUE_INVITATION_USECASE, GET_INVITATION_QUERY],
    };
  }
}
