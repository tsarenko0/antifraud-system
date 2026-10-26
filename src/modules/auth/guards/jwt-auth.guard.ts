import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { IJwtPayload } from '../interfaces/jwt-payload.interface.js';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../../constants/index.js';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const [authStr, accessToken] =
      request.headers.authorization?.split(' ') ?? [];

    if (authStr != 'Bearer' || !accessToken) throw new UnauthorizedException();

    try {
      request.user =
        await this.jwtService.verifyAsync<IJwtPayload>(accessToken);
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
