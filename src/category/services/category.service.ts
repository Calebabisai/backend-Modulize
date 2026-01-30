import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  // Crear Categoría (Vinculada al Admin que la crea)
  async create(dto: CreateCategoryDto, userId: number) {
    return this.prisma.category.create({
      data: {
        name: dto.name,
        description: dto.description || '',
        // Conectamos con el usuario (audit)
        user: { connect: { id: userId } },
      },
    });
  }

  // Obtener todas las categorías (Para los filtros del Frontend)
  async findAll() {
    return this.prisma.category.findMany({
      include: {
        _count: { select: { products: true } },
      },
    });
  }

  // Obtener uno por ID
  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { products: true }, // Para ver qué productos tiene
    });
    if (!category) throw new NotFoundException('Categoría no encontrada');
    return category;
  }

  async update(id: number, updateDto: UpdateCategoryDto) {
    await this.findOne(id); // Validamos que exista
    return this.prisma.category.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Validamos que exista
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
