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
    ]),
  ],
  providers: [
    UserMongoRepository,
    AuthMongoRepository,
    AuthSendLogMongoRepository,
  ],
  exports: [
    UserMongoRepository,
    AuthMongoRepository,
    AuthSendLogMongoRepository,
  ],
})
export class RepositoriesModule {}
