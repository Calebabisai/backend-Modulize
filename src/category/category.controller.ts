import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ValidRoles } from 'src/common/enums/role.enum';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CategoryService } from './services/category.service';
import { UpdateCategoryDto } from './dtos/update-category.dto';

// 1. Definimos la interfaz para la Request (Evita el uso de 'any')
interface RequestWithUser extends Record<string, any> {
  user: {
    userId: number;
    email: string;
    role: string;
  };
}

@ApiTags('Categorías')
@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ValidRoles.ADMIN)
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Request() req: RequestWithUser, //Usamos nuestra interfaz aquí
  ) {
    // Ahora 'userId' está tipado correctamente como número
    const userId: number = req.user.userId;

    // Se pasa el argumento seguro al servicio
    return this.categoryService.create(createCategoryDto, userId);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ValidRoles.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ValidRoles.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }
}
