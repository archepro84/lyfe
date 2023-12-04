import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '@infrastructure/adapter/out/persistence/user/schema/user.schema';
import { UserMongoRepository } from '@infrastructure/adapter/out/persistence/user/user.mongo.repository';
import { AuthSchema } from '@infrastructure/adapter/out/persistence/auth/schema/auth.schema';
import { AuthSendLogSchema } from '@infrastructure/adapter/out/persistence/auth/schema/auth-send-log.schema';
import { AuthMongoRepository } from '@infrastructure/adapter/out/persistence/auth/auth.mongo.repository';
import { AuthSendLogMongoRepository } from '@infrastructure/adapter/out/persistence/auth/auth-send-log.mongo.repository';
import { EnvironmentConfigModule } from '@infrastructure/common/config/environment-config.module';
import { EnvironmentConfigService } from '@infrastructure/common/config/environment-config.service';
import { InvitationSchema } from '@infrastructure/adapter/out/persistence/auth/invitation/schema/invitation.schema';
import { AdminSchema } from '@infrastructure/adapter/out/persistence/admin/schema/admin.schema';
import { AdminMongoRepository } from '@infrastructure/adapter/out/persistence/admin/admin.mongo.repository';
import { InvitationMongoRepository } from '@infrastructure/adapter/out/persistence/auth/invitation/invitation.mongo.repository';
import { UserMapper } from '@infrastructure/adapter/out/persistence/user/mapper/user.mapper';
import { User } from '@domain/user/user';
import { Auth } from '@domain/auth/auth';
import { AuthSendLog } from '@domain/auth/auth-send-log';
import { Admin } from '@domain/admin/admin';
import { Invitation } from '@domain/auth/invitation';
import { AuthMapper } from '@infrastructure/adapter/out/persistence/auth/mapper/auth.mapper';
import { AuthSendLogMapper } from '@infrastructure/adapter/out/persistence/auth/mapper/auth-send-log.mapper';
import { InvitationMapper } from '@infrastructure/adapter/out/persistence/auth/invitation/mapper/invitation.mapper';
import { AdminMapper } from '@infrastructure/adapter/out/persistence/admin/mapper/admin.mapper';
import { RegionMapper } from '@infrastructure/adapter/out/persistence/region/mapper/region.mapper';
import { RegionMongoRepository } from '@infrastructure/adapter/out/persistence/region/region.mongo.repository';
import { Region } from '@domain/region/region';
import { RegionSchema } from '@infrastructure/adapter/out/persistence/region/schema/region.schema';
import { TransactionManager } from '@infrastructure/adapter/out/persistence/common/transaction/transaction.manager';
import { Topic } from '@domain/topic/topic';
import { TopicSchema } from '@infrastructure/adapter/out/persistence/topic/schema/topic.schema';
import { TopicMongoRepository } from '@infrastructure/adapter/out/persistence/topic/topic.mongo.repository';
import { TopicMapper } from '@infrastructure/adapter/out/persistence/topic/mapper/topic.mapper';
import { VoteMapper } from '@infrastructure/adapter/out/persistence/topic/mapper/vote.mapper';
import { Vote } from '@domain/topic/vote/vote';
import { VoteSchema } from '@infrastructure/adapter/out/persistence/topic/schema/vote.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: (configService: EnvironmentConfigService) => ({
        uri: configService.getDatabaseUrl(),
      }),
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Auth.name, schema: AuthSchema },
      { name: AuthSendLog.name, schema: AuthSendLogSchema },
      { name: Admin.name, schema: AdminSchema },
      { name: Invitation.name, schema: InvitationSchema },
      { name: Region.name, schema: RegionSchema },
      { name: Topic.name, schema: TopicSchema },
      { name: Vote.name, schema: VoteSchema },
    ]),
  ],
  providers: [
    TransactionManager,
    UserMapper,
    UserMongoRepository,
    AuthMapper,
    AuthMongoRepository,
    AuthSendLogMapper,
    AuthSendLogMongoRepository,
    InvitationMapper,
    InvitationMongoRepository,
    AdminMapper,
    AdminMongoRepository,
    RegionMapper,
    RegionMongoRepository,
    TopicMapper,
    VoteMapper,
    TopicMongoRepository,
  ],
  exports: [
    UserMongoRepository,
    AuthMongoRepository,
    AuthSendLogMongoRepository,
    InvitationMongoRepository,
    AdminMongoRepository,
    RegionMongoRepository,
    TopicMongoRepository,
  ],
})
export class RepositoriesModule {}
