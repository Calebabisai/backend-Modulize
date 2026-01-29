import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { User } from 'src/generated/prisma';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
