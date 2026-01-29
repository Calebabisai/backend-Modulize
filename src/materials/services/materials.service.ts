import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { CreateMaterialDto } from '../dtos/create-material.dto';

@Injectable()
export class MaterialsService {
  constructor(private prisma: PrismaService) {}

  // Crear un Activo (Vinculado al Usuario y Categoría)
  async create(dto: CreateMaterialDto, userId: number) {
    // Validar que la categoría exista
    const category = await this.prisma.category.findUnique({
      where: { id: dto.categoryId },
    });
    if (!category) throw new NotFoundException('La categoría no existe');

    return this.prisma.asset.create({
      data: {
        name: dto.name,
        description: dto.description,
        status: dto.status,
        imageUrl: dto.imageUrl,
        category: { connect: { id: dto.categoryId } }, // Conectar con Categoría
        createdBy: { connect: { id: userId } }, // Conectar con Usuario (Admin)
      },
    });
  }

  // Obtener todos (Con filtro opcional por categoría)
  async findAll(categoryId?: number) {
    return this.prisma.asset.findMany({
      where: categoryId ? { categoryId: Number(categoryId) } : {}, // Filtro si envían ?categoryId=1
      include: {
        category: true, // Incluir datos de la categoría
        createdBy: { select: { name: true, email: true } }, // Quién lo creó
      },
    });
  }

  // Obtener uno por ID (Para el detalle de la tarjeta)
  async findOne(id: number) {
    const asset = await this.prisma.asset.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!asset)
      throw new NotFoundException(`Activo con ID ${id} no encontrado`);
    return asset;
  }

  // Eliminar (Requisito del CRUD)
  async remove(id: number) {
    return this.prisma.asset.delete({
      where: { id },
    });
  }
}
