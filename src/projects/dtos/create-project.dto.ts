import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'Laptops' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'Equipos portátiles para el staff' })
  @IsString()
  @IsOptional()
  description?: string;
}
