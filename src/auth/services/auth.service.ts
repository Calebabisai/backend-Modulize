import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/services/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/generated/prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // REGISTRO DE USUARIOS
  async register(
    email: string,
    pass: string,
    name: string,
  ): Promise<{ message: string; userId: number }> {
    // Verificar si el usuario ya existe
    const userExists: User | null = await this.prisma.user.findUnique({
      where: { email },
    });
    if (userExists)
      throw new BadRequestException('El correo ya está registrado');

    // Encriptar contraseña
    const hashedPassword: string = await bcrypt.hash(pass, 10);

    // Guardar en DB
    const user: User = await this.prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    return { message: 'Usuario creado con éxito', userId: user.id };
  }

  // LOGIN Y GENERACIÓN DE TOKEN
  async login(
    email: string,
    pass: string,
  ): Promise<{
    access_token: string;
    user: { id: number; name: string | null; email: string };
  }> {
    const user: User | null = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    // Comparar contraseña encriptada
    const isMatch: boolean = await bcrypt.compare(pass, user.password);
    if (!isMatch) throw new UnauthorizedException('Credenciales inválidas');

    // Generar el Token JWT
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: { id: user.id, name: user.name, email: user.email },
    };
  }
}
