import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { MaterialsService } from './services/materials.service';
import { CreateMaterialDto } from './dtos/create-material.dto';
import { UpdateMaterialDto } from './dtos/update-material.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ValidRoles } from 'src/common/enums/role.enum';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

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

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.materialsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ValidRoles.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateMaterialDto,
  ) {
    return this.materialsService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ValidRoles.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.materialsService.remove(id);
  }
}
