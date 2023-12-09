import { Module } from '@nestjs/common';
import { ApplicationModule } from '@application/application.module';
import { UserController } from '@infrastructure/adapter/in/web/user/user.controller';
import { RepositoriesModule } from '@infrastructure/adapter/out/persistence/repositories.module';
import { SnsModule } from '@infrastructure/adapter/out/messaging/sns/sns.module';
import { AuthController } from '@infrastructure/adapter/in/web/auth/auth.controller';
import { ServiceProxyModule } from '@infrastructure/adapter/in/web/service-proxy/service-proxy.module';
import { AdminController } from '@infrastructure/adapter/in/web/admin/admin.controller';
import { RegionController } from '@infrastructure/adapter/in/web/region/region.controller';
import { TopicController } from '@infrastructure/adapter/in/web/topic/topic.controller';
import { CommentController } from '@infrastructure/adapter/in/web/topic/comment/comment.controller';

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
    CommentController,
    TopicController,
  ],
  providers: [],
  exports: [ServiceProxyModule],
})
export class InfrastructureModule {}
