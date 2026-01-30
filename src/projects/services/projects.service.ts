import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { CreateProjectDto } from '../dtos/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  // 1. Crear Proyecto (Vinculado al Admin que lo crea)
  async create(dto: CreateProjectDto, userId: number) {
    // Cambiamos 'category' por 'project'
    return this.prisma.project.create({
      data: {
        name: dto.name,
        description: dto.description || '',
        user: { connect: { id: userId } },
      },
    });
  }

  // 2. Obtener todos los proyectos (Para los filtros del Frontend)
  async findAll() {
    // Cambiamos 'category' por 'project'
    return this.prisma.project.findMany({
      include: {
        // Cambiamos 'assets' por 'materials' en el conteo
        _count: { select: { materials: true } },
      },
    });
  }
}
