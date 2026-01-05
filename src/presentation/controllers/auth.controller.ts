import { Controller, Post, Get, Body } from '@nestjs/common';

import { RegistrarUsuario } from '../../application/use-cases/registrar-usuario.use-case';

import { IniciarSesion } from '../../application/use-cases/iniciar-sesion.use-case';

import { ListarUsuarios } from '../../application/use-cases/listar-usuarios.use-case';

import { CrearUsuarioDto } from '../../application/dtos/crear-usuario.dto';

import { IniciarSesionDto } from '../../application/dtos/iniciar-sesion.dto';

@Controller('auth')

export class AuthController {

  constructor(

    private registrarUsuario: RegistrarUsuario,

    private iniciarSesion: IniciarSesion,

    private listarUsuarios: ListarUsuarios,

  ) {}

  @Post('register')

  async register(@Body() dto: CrearUsuarioDto) {

    await this.registrarUsuario.ejecutar(dto);

    return { message: 'Usuario registrado' };

  }

  @Post('login')

  async login(@Body() dto: IniciarSesionDto) {

    const usuario = await this.iniciarSesion.ejecutar(dto);

    if (!usuario) {

      return { message: 'Credenciales invalidas' };

    }

    return { message: 'Sesion iniciada', usuarioId: usuario.id };

  }

  @Get('users')

  async listar() {

    return await this.listarUsuarios.ejecutar();

  }

}