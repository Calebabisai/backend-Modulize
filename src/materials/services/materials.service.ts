import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { CreateMaterialDto } from '../dtos/create-material.dto';
import { UpdateMaterialDto } from '../dtos/update-material.dto';

@Injectable()
export class MaterialsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMaterialDto) {
    // Validamos que el proyecto exista
    const project = await this.prisma.project.findUnique({
      where: { id: dto.projectId },
    });

    if (!project) throw new NotFoundException('El proyecto no existe');

    // Creamos el material
    return this.prisma.material.create({
      data: {
        name: dto.name,
        status: dto.status,
        imageUrl: dto.imageUrl,
        projectId: dto.projectId,
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

  // Obtener uno por ID
  async findOne(id: number) {
    const material = await this.prisma.material.findUnique({
      where: { id },
      include: { project: true },
    });

    if (!material)
      throw new NotFoundException(`Material con ID ${id} no encontrado`);

    return material;
  }

  async update(id: number, updateDto: UpdateMaterialDto) {
    // Validamos que exista. No asignamos a variable para evitar el error de 'unused-vars'
    await this.findOne(id);

    return this.prisma.material.update({
      where: { id },
      data: updateDto, // Ahora es seguro porque usamos el DTO tipado
    });
  }

  async remove(id: number) {
    // Solo ejecutamos la validación. Si no existe, findOne lanzará la NotFoundException
    await this.findOne(id);

    return this.prisma.material.delete({
      where: { id },
    });
  }
}
