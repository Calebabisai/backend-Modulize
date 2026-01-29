import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { CreateProjectDto } from '../dtos/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  // Crear Categoría (Solo Admin debería poder, pero lo validamos en el Controller)
  async create(dto: CreateProjectDto) {
    return this.prisma.category.create({
      data: {
        name: dto.name,
      },
    });
  }

  // Obtener todas las categorías (Para el menú de filtros del Front)
  async findAll() {
    return this.prisma.category.findMany({
      include: {
        _count: { select: { assets: true } }, // Extra: Devuelve cuántos equipos hay en cada categoría
      },
    });
  }
}
