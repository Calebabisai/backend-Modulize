import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ValidRoles } from 'src/common/enums/role.enum';

// El rol que viene en el JWT es un string plano (ej: "ADMIN")
interface AuthenticatedUser {
  userId: number;
  email: string;
  role: string;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Obtenemos los roles requeridos por el decorador @Roles()
    const requiredRoles = this.reflector.getAllAndOverride<ValidRoles[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    // Si el endpoint no tiene el decorador @Roles, cualquiera puede pasar
    if (!requiredRoles) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<{ user: AuthenticatedUser }>();
    const user = request.user;

    // Verificamos si el usuario existe y si su rol (string)
    // está incluido en la lista de roles permitidos (ValidRoles[])
    const hasRole = user && requiredRoles.includes(user.role as ValidRoles);

    if (!hasRole) {
      // Lanzamos la excepción con un mensaje claro para el Frontend
      throw new ForbiddenException(
        `Tu rol (${user?.role || 'invitado'}) no tiene permisos para esta acción`,
      );
    }

    return true;
  }
}
