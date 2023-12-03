import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAdminRefreshGuard extends AuthGuard('jwt-admin-refresh') {}
