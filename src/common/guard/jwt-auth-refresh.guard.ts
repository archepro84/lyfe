import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthRefreshGuard extends AuthGuard('jwt-refresh') {}
