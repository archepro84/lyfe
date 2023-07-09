import { Module } from '@nestjs/common';
import { ApplicationModule } from '@application/application.module';
import { UserController } from '@adapter/in/web/user/user.controller';
import { RepositoriesModule } from 'src/adapter/out/persistence/repositories.module';
import { SnsModule } from '@adapter/out/messaging/sns/sns.module';
import { AuthController } from '@adapter/in/web/auth/auth.controller';
import { ServiceProxyModule } from '@adapter/in/web/service-proxy/service-proxy.module';

@Module({
  imports: [
    ApplicationModule,
    SnsModule,
    RepositoriesModule,
    ServiceProxyModule,
  ],
  controllers: [AuthController, UserController],
  providers: [],
  exports: [ServiceProxyModule],
})
export class AdapterModule {}
