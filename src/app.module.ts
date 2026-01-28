import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommonModule } from './common/common.module';
import { MaterialsModule } from './materials/materials.module';
import { ProjectsModule } from './projects/projects.module';
import { PrismaService } from './prisma/services/prisma.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    CommonModule,
    MaterialsModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
