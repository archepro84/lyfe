import { Module } from '@nestjs/common';

import { AuthServiceProxyModule } from '@adapter/in/web/service-proxy/auth.service-proxy.module';
import { UserServiceProxyModule } from '@adapter/in/web/service-proxy/user.service-proxy.module';

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
