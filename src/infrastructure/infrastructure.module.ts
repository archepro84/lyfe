import { Module } from '@nestjs/common';
import { ApplicationModule } from '@application/application.module';
import { UserController } from '@infrastructure/in/web/user/user.controller';
import { RepositoriesModule } from '@infrastructure/out/persistence/repositories.module';
import { SnsModule } from '@infrastructure/out/messaging/sns/sns.module';
import { AuthController } from '@infrastructure/in/web/auth/auth.controller';
import { ServiceProxyModule } from '@infrastructure/in/web/service-proxy/service-proxy.module';
import { AdminController } from '@infrastructure/in/web/admin/admin.controller';
import { RegionController } from '@infrastructure/in/web/region/region.controller';
import { TopicController } from '@infrastructure/in/web/topic/topic.controller';

@Module({
  imports: [
    ApplicationModule,
    SnsModule,
    RepositoriesModule,
    ServiceProxyModule,
  ],
  controllers: [
    AuthController,
    UserController,
    AdminController,
    RegionController,
    TopicController,
  ],
  providers: [],
  exports: [ServiceProxyModule],
})
export class InfrastructureModule {}
