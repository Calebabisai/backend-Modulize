import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    // validamos que la categoría exista (antes project)
    const category = await this.prisma.category.findUnique({
      where: { id: dto.categoryId },
    });

    if (!category) throw new NotFoundException('La categoría no existe');

    // Creamos el producto (antes material)
    return this.prisma.product.create({
      data: {
        name: dto.name,
        description: dto.description,
        status: dto.status,
        imageUrl: dto.imageUrl,
        categoryId: dto.categoryId,
      },
    });
  }

  // Obtener todos (Con filtro por Categoría e inclusión anidada)
  async findAll(categoryId?: number) {
    return this.prisma.product.findMany({
      where: categoryId ? { categoryId: Number(categoryId) } : {},
      include: {
        // Traemos la categoría y, a través de ella, el usuario (Audit)
        category: {
          include: {
            user: { select: { name: true, email: true } },
          },
        },
      },
    });
  }

  // Obtener uno por ID
  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product)
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);

    return product;
  }

  async update(id: number, updateDto: UpdateProductDto) {
    await this.findOne(id);

    return this.prisma.product.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.product.delete({
      where: { id },
    });
  }
}
