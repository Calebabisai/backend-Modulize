import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { CreateProjectDto } from './dtos/create-project.dto';
// Asumo que tienes un JwtAuthGuard creado o usas passport directamente
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  // @UseGuards(JwtAuthGuard) // Descomenta si quieres proteger la creación
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }
}
