import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'MacBook Pro M3',
    description: 'Nombre del dispositivo electrónico',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;
  //Precio
  @ApiProperty({
    example: 1999.99,
    description: 'Precio del producto',
  })
  @IsNumber()
  @Min(0) // Validación extra para que no sea negativo
  @IsNotEmpty()
  price!: number;

  //Stock
  @ApiProperty({
    example: 10,
    description: 'Cantidad disponible en inventario',
  })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  stock!: number;

  //Descripción
  @ApiProperty({
    example: 'Chip M3, 16GB RAM, 512GB SSD',
    description: 'Detalles técnicos del equipo',
  })
  @IsString()
  @IsOptional() // opcional porque a veces no quieres escribir descripción obligada
  description?: string;

  @ApiProperty({
    example: 'Disponible',
    description: 'Estado actual: Disponible, Asignado o En Reparación',
  })
  @IsString()
  @IsOptional() // Generalmente el backend pone "Disponible" por defecto, así que puede ser opcional
  status?: string;

  @ApiProperty({
    example: 1,
    description: 'ID de la Categoría a la que pertenece este producto',
  })
  @IsNumber()
  @IsNotEmpty()
  categoryId!: number;

  @ApiProperty({
    example: 'https://tu-bucket.com/imagen.png',
    required: false,
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;
}
