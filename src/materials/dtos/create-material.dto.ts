import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMaterialDto {
  @ApiProperty({
    example: 'MacBook Pro M3',
    description: 'Nombre del dispositivo electrónico',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: 'Chip M3, 16GB RAM, 512GB SSD',
    description: 'Detalles técnicos del equipo',
  })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({
    example: 'Disponible',
    description: 'Estado actual: Disponible, Asignado o En Reparación',
  })
  @IsString()
  @IsNotEmpty()
  status!: string;

  @ApiProperty({
    example: 1,
    description: 'ID del Proyecto al que pertenece este material',
  })
  @IsNumber()
  @IsNotEmpty()
  projectId!: number; // Renombrado de categoryId para cumplir con la 3NF

  @ApiProperty({
    example: 'https://tu-bucket.com/imagen.png',
    required: false,
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;
}
