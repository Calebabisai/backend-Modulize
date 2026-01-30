import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from './services/users/users.service';

// Define la interfaz arriba o en un archivo de tipos
interface RequestWithUser extends Record<string, any> {
  user: {
    email: string;
    userId: number;
    role: string;
  };
}

@ApiTags('Usuarios')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Obtener mi perfil',
    description: 'Retorna los datos del usuario autenticado',
  })
  async getProfile(@Request() req: RequestWithUser) {
    return this.usersService.findOneByEmail(req.user.email);
  }
}
