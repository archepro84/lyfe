import { AuthServiceProxyModule } from '@adapter/in/web/service-proxy/auth.service-proxy.module';
import { UserServiceProxyModule } from '@adapter/in/web/service-proxy/user.service-proxy.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    AuthServiceProxyModule.register(),
    UserServiceProxyModule.register(),
  ],
  exports: [
    AuthServiceProxyModule.register(),
    UserServiceProxyModule.register(),
  ],
})
export class ServiceProxyModule {}
