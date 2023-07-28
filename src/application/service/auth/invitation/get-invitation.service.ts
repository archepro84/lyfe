import { InvitationRepository } from '@application/port/out/auth/invitation/invitation.repository';
import { LoggerPort } from '@application/port/common/logger/logger.port';
import { GetInvitationQuery } from '@application/port/in/user/invitation/get-invitation.query';
import { Invitation } from '@domain/auth/invitation';

export class GetInvitationService implements GetInvitationQuery {
  constructor(
    private readonly logger: LoggerPort,
    private readonly invitationRepository: InvitationRepository,
  ) {}

  async exec(phoneNumber: string): Promise<Invitation | null> {
    return await this.invitationRepository.getInvitation(phoneNumber);
  }
}
