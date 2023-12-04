import { Injectable, OnModuleInit } from '@nestjs/common';
import { SendVerificationPort } from '@application/port/out/auth/send-verification.port';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { EnvironmentConfigService } from '@infrastructure/common/config/environment-config.service';

// docs: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/preview/client/sns/command/PublishCommand/
@Injectable()
export class SnsAdapter implements SendVerificationPort, OnModuleInit {
  snsClient: SNSClient;

  constructor(
    private readonly environmentConfigService: EnvironmentConfigService,
  ) {}

  async onModuleInit() {
    const snsRegion = this.environmentConfigService.getAwsSnsRegion();

    this.snsClient = new SNSClient({
      region: snsRegion,
    });
  }

  async sendVerification(
    phoneNumber: string,
    verificationCode: string,
  ): Promise<void> {
    const command = new PublishCommand({
      Message: `${process.env.SERVICE_NAME} verification code is ${verificationCode}`,
      PhoneNumber: phoneNumber,
    });

    await this.snsClient.send(command);
  }
}
