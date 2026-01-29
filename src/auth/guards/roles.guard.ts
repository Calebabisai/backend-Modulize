import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '@prisma/client';

// Definimos la forma del usuario que viene en el JWT
interface AuthenticatedUser {
  userId: number;
  email: string;
  role: Role;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    // Tipamos la petición para que ESLint sepa que existe 'user'
    const request = context
      .switchToHttp()
      .getRequest<{ user: AuthenticatedUser }>();
    const user = request.user;

    // Ahora 'user.role' ya no es 'any'
    const hasRole = user && requiredRoles.includes(user.role);

    if (!hasRole) {
      throw new ForbiddenException('No tienes permisos de administrador');
    }

    return hasRole;
  }
}
