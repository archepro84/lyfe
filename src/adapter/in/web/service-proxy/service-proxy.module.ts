import { Module } from '@nestjs/common';

import { AuthServiceProxyModule } from '@adapter/in/web/service-proxy/auth.service-proxy.module';
import { UserServiceProxyModule } from '@adapter/in/web/service-proxy/user.service-proxy.module';
import { AdminServiceProxyModule } from '@adapter/in/web/service-proxy/admin.service-proxy.module';
import { InvitationServiceProxyModule } from '@adapter/in/web/service-proxy/invitation.service-proxy.module';

@Module({
  imports: [
    AuthServiceProxyModule.register(),
    UserServiceProxyModule.register(),
    InvitationServiceProxyModule.register(),
    AdminServiceProxyModule.register(),
  ],
  exports: [
    AuthServiceProxyModule.register(),
    UserServiceProxyModule.register(),
    InvitationServiceProxyModule.register(),
    AdminServiceProxyModule.register(),
  ],
})
export class ServiceProxyModule {}
