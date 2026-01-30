import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Estado del servidor' })
  checkHealth() {
    return {
      status: 'API is running',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
