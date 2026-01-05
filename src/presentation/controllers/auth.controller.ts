import { Controller, Post, Body } from '@nestjs/common';

import { RegistrarUsuario } from '../../application/use-cases/registrar-usuario.use-case';

import { CrearUsuarioDto } from '../../application/dtos/crear-usuario.dto';

@Controller('auth')

export class AuthController {

  constructor(private registrarUsuario: RegistrarUsuario) {}

  @Post('register')

  async register(@Body() dto: CrearUsuarioDto) {

    await this.registrarUsuario.ejecutar(dto);

    return { message: 'Usuario registrado' };

  }

}