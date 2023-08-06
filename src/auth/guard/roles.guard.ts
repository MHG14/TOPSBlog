import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator';
import { Role } from '../enum/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(ctx: ExecutionContext): boolean {
    // what is the required roles?
    const requiredRole = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (!requiredRole) return true;

    const { user } = ctx.switchToHttp().getRequest();
    // does the current user making the request have those required roles?
    return requiredRole === user.role;
  }
}
