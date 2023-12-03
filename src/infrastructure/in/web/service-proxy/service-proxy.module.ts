import { Module } from '@nestjs/common';

import { AuthServiceProxyModule } from '@infrastructure/in/web/service-proxy/auth.service-proxy.module';
import { UserServiceProxyModule } from '@infrastructure/in/web/service-proxy/user.service-proxy.module';
import { AdminServiceProxyModule } from '@infrastructure/in/web/service-proxy/admin.service-proxy.module';
import { InvitationServiceProxyModule } from '@infrastructure/in/web/service-proxy/invitation.service-proxy.module';
import { RegionServiceProxyModule } from '@infrastructure/in/web/service-proxy/region.service-proxy.module';
import { TopicServiceProxyModule } from '@infrastructure/in/web/service-proxy/topic.service-proxy.module';

@Module({
  imports: [
    AuthServiceProxyModule.register(),
    UserServiceProxyModule.register(),
    InvitationServiceProxyModule.register(),
    AdminServiceProxyModule.register(),
    RegionServiceProxyModule.register(),
    TopicServiceProxyModule.register(),
  ],
  exports: [
    AuthServiceProxyModule.register(),
    UserServiceProxyModule.register(),
    InvitationServiceProxyModule.register(),
    AdminServiceProxyModule.register(),
    RegionServiceProxyModule.register(),
    TopicServiceProxyModule.register(),
  ],
})
export class ServiceProxyModule {}
