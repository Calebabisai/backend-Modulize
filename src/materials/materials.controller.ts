import { MaterialsService } from './services/materials.service';
import { CreateMaterialDto } from './dtos/create-material.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

// Interfaz para extender la petición de Express
interface RequestWithUser extends Record<string, any> {
  user: {
    userId: number;
    email: string;
    role: Role;
  };
}
@ApiTags('Materials')
@ApiBearerAuth()
@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  // Usamos nuestra interfaz personalizada aquí
  create(
    @Body() createDto: CreateMaterialDto,
    @Request() req: RequestWithUser,
  ) {
    // Ahora req.user.userId está tipado como number y no lanza error
    const userId = req.user.userId;
    return this.materialsService.create(createDto, userId);
  }
}
