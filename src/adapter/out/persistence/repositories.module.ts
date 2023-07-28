import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '@adapter/out/persistence/user/schema/user.schema';
import { UserMongoRepository } from '@adapter/out/persistence/user/user.mongo.repository';
import { AuthSchema } from '@adapter/out/persistence/auth/schema/auth.schema';
import { AuthSendLogSchema } from '@adapter/out/persistence/auth/schema/auth-send-log.schema';
import { AuthMongoRepository } from '@adapter/out/persistence/auth/auth.mongo.repository';
import { AuthSendLogMongoRepository } from '@adapter/out/persistence/auth/auth-send-log.mongo.repository';
import { EnvironmentConfigModule } from '@common/config/environment-config.module';
import { EnvironmentConfigService } from '@common/config/environment-config.service';
import { InvitationSchema } from '@adapter/out/persistence/auth/invitation/schema/invitation.schema';
import { AdminSchema } from '@adapter/out/persistence/admin/schema/admin.schema';
import { AdminMongoRepository } from '@adapter/out/persistence/admin/admin.mongo.repository';
import { InvitationMongoRepository } from '@adapter/out/persistence/auth/invitation/invitation.mongo.repository';

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
      { name: 'User', schema: UserSchema },
      { name: 'Auth', schema: AuthSchema },
      { name: 'AuthSendLog', schema: AuthSendLogSchema },
      { name: 'Admin', schema: AdminSchema },
      { name: 'Invitation', schema: InvitationSchema },
    ]),
  ],
  providers: [
    UserMongoRepository,
    AuthMongoRepository,
    AuthSendLogMongoRepository,
    InvitationMongoRepository,
    AdminMongoRepository,
  ],
  exports: [
    UserMongoRepository,
    AuthMongoRepository,
    AuthSendLogMongoRepository,
    InvitationMongoRepository,
    AdminMongoRepository,
  ],
})
export class RepositoriesModule {}
