import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { CreateMaterialDto } from '../dtos/create-material.dto';

@Injectable()
export class MaterialsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMaterialDto) {
    // 1. Validamos que el proyecto exista
    const project = await this.prisma.project.findUnique({
      where: { id: dto.projectId },
    });

    if (!project) throw new NotFoundException('El proyecto no existe');

    // 2. Creamos el material
    return this.prisma.material.create({
      data: {
        name: dto.name,
        status: dto.status,
        imageUrl: dto.imageUrl,
        projectId: dto.projectId, // Usamos la FK directa
      },
    });
  }

  // Obtener todos (Con filtro por Proyecto e inclusión anidada)
  async findAll(projectId?: number) {
    return this.prisma.material.findMany({
      where: projectId ? { projectId: Number(projectId) } : {},
      include: {
        // Traemos el proyecto y, a través de él, quién es el responsable (User)
        project: {
          include: {
            user: { select: { name: true, email: true } },
          },
        },
      },
    });
  }

  // 3. Obtener uno por ID
  async findOne(id: number) {
    const material = await this.prisma.material.findUnique({
      where: { id },
      include: { project: true },
    });

    if (!material)
      throw new NotFoundException(`Material con ID ${id} no encontrado`);

    return material;
  }

  // 4. Eliminar
  async remove(id: number) {
    return this.prisma.material.delete({
      where: { id },
    });
  }
}
