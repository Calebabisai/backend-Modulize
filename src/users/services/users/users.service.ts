import { Injectable } from '@nestjs/common';
import { User } from 'src/generated/prisma/browser';
import { PrismaService } from 'src/prisma/services/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
