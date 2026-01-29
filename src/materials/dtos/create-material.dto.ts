import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateMaterialDto {
  @IsString()
  @IsNotEmpty()
  name!: string; // Ej: "Cualquier dispositivo electrónico(Mac, Asus laptop, iPhone, etc.)"

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  status!: string; // Ej: "Disponible", "En Reparación", "Asignado"

  @IsNumber()
  @IsNotEmpty()
  categoryId!: number; // ID de la categoría (del módulo Projects)
  @IsString()
  @IsOptional()
  imageUrl?: string; // URL de la imagen (opcional)
}
