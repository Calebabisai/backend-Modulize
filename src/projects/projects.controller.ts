import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ValidRoles } from 'src/common/enums/role.enum';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

// 1. Definimos la interfaz para la Request (Evita el uso de 'any')
interface RequestWithUser extends Record<string, any> {
  user: {
    userId: number;
    email: string;
    role: string;
  };
}

@ApiTags('Proyectos (Categorías)')
@ApiBearerAuth()
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ValidRoles.ADMIN)
  create(
    @Body() createProjectDto: CreateProjectDto,
    @Request() req: RequestWithUser, // 2. Usamos nuestra interfaz aquí
  ) {
    // 3. Ahora 'userId' está tipado correctamente como número
    const userId: number = req.user.userId;

    // 4. Se pasa el argumento seguro al servicio
    return this.projectsService.create(createProjectDto, userId);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }
}
