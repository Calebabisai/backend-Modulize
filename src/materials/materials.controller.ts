import { MaterialsService } from './services/materials.service';
import { CreateMaterialDto } from './dtos/create-material.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common'; // Quitamos Request
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ValidRoles } from 'src/common/enums/role.enum';

@ApiTags('Materiales')
@ApiBearerAuth()
@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ValidRoles.ADMIN)
  create(@Body() createDto: CreateMaterialDto) {
    return this.materialsService.create(createDto);
  }

  @Get()
  findAll() {
    return this.materialsService.findAll();
  }
}
