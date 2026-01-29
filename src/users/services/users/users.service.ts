import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<User | null> {
    // Agregamos el 'await' para cumplir con la regla de ESLint
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }
}
