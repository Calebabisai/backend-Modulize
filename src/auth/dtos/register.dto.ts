import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'caleb@turing.com',
    description: 'Correo electrónico único',
  })
  @IsEmail({}, { message: 'El formato del correo no es válido' })
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    example: '123456',
    description: 'Contraseña de mínimo 6 caracteres',
  })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  pass!: string;

  @ApiProperty({
    example: 'Admin Caleb',
    description: 'Nombre completo del usuario',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;
}
