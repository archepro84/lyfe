import { Module } from '@nestjs/common';
import { ApplicationModule } from '@application/application.module';
import { UserController } from '@adapter/in/web/user/user.controller';
import { RepositoriesModule } from 'src/adapter/out/persistence/repositories.module';
import { SnsModule } from '@adapter/out/messaging/sns/sns.module';
import { AuthController } from '@adapter/in/web/auth/auth.controller';
import { ServiceProxyModule } from '@adapter/in/web/service-proxy/service-proxy.module';
import { AdminController } from '@adapter/in/web/admin/admin.controller';
import { RegionController } from '@adapter/in/web/region/region.controller';

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
  ],
  providers: [],
  exports: [ServiceProxyModule],
})
export class AdapterModule {}
