import { Module } from '@nestjs/common';
import { ProductsService } from './services/product.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductsController } from './products.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
