import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/services/prisma.service';
import * as bcrypt from 'bcrypt';
import { ValidRoles } from 'src/common/enums/role.enum';

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
    const userExists = await this.prisma.user.findUnique({
      where: { email },
    });
    if (userExists)
      throw new BadRequestException('El correo ya está registrado');

    // Buscamos el ID del rol "USER" en la tabla Role
    const defaultRole = await this.prisma.role.findUnique({
      where: { name: ValidRoles.USER },
    });

    if (!defaultRole)
      throw new BadRequestException('Error en la configuración de roles');

    const hashedPassword = await bcrypt.hash(pass, 10);

    // Guardamos vinculando el roleId
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        roleId: defaultRole.id, // Asignamos el ID de la tabla Role
      },
    });

    return { message: 'Usuario creado con éxito', userId: user.id };
  }

  // LOGIN Y GENERACIÓN DE TOKEN
  async login(
    email: string,
    pass: string,
  ): Promise<{
    access_token: string;
    user: { id: number; name: string | null; email: string; role: string };
  }> {
    // Usamos 'include' para traer el nombre del rol
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) throw new UnauthorizedException('Credenciales inválidas');

    //  Generar el Token JWT usando el nombre desde la relación
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role.name, // "ADMIN" o "USER"
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name,
      },
    };
  }
}
