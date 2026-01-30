import { Module } from '@nestjs/common';
import { CategoryService } from './services/category.service';
import { CategoriesController } from './category.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CategoriesController],
  providers: [CategoryService],
})
export class CategoriesModule {}
