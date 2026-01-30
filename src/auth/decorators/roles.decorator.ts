import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from 'src/common/enums/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ValidRoles[]) => SetMetadata(ROLES_KEY, roles);
