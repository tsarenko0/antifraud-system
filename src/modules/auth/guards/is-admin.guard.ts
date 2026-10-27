import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import e from 'express';
import { UserRoles } from '../../../generated/prisma/enums.js';

@Injectable()
export class IsAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: e.Request = context.switchToHttp().getRequest();
    const user = request.user;

    return user?.role === UserRoles.ADMIN;
  }
}
