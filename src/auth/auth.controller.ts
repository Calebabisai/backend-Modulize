import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LoginDto } from './dtos/login.dto';
import { ApiOperation } from '@nestjs/swagger';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Inicio de sesión' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.pass);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registro de nuevos usuarios' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(
      registerDto.email,
      registerDto.pass,
      registerDto.name,
    );
  }
}
