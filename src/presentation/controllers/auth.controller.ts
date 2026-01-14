import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';

import { RegistrarUsuario } from '../../application/use-cases/registrar-usuario.use-case';

import { IniciarSesion } from '../../application/use-cases/iniciar-sesion.use-case';

import { ListarUsuarios } from '../../application/use-cases/listar-usuarios.use-case';

import { EditarUsuario } from '../../application/use-cases/editar-usuario.use-case';

import { EliminarUsuario } from '../../application/use-cases/eliminar-usuario.use-case';

import { CambiarContrasena } from '../../application/use-cases/cambiar-contrasena.use-case';

import { CrearUsuarioDto } from '../../application/dtos/crear-usuario.dto';

import { IniciarSesionDto } from '../../application/dtos/iniciar-sesion.dto';

import { EditarUsuarioDto } from '../../application/dtos/editar-usuario.dto';

import { EliminarUsuarioDto } from '../../application/dtos/eliminar-usuario.dto';

import { CambiarContrasenaDto } from '../../application/dtos/cambiar-contrasena.dto';

@Controller('auth')

export class AuthController {

  constructor(

    private registrarUsuario: RegistrarUsuario,

    private iniciarSesion: IniciarSesion,

    private listarUsuarios: ListarUsuarios,

    private editarUsuario: EditarUsuario,

    private eliminarUsuario: EliminarUsuario,

    private cambiarContrasena: CambiarContrasena,

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

  @Put('users')

  async editar(@Body() dto: EditarUsuarioDto) {

    await this.editarUsuario.ejecutar(dto);

    return { message: 'Usuario editado' };

  }

  @Delete('users/:id')

  async eliminar(@Param('id') id: string) {

    await this.eliminarUsuario.ejecutar({ id });

    return { message: 'Usuario eliminado' };

  }

  @Post('change-password')

  async cambiar(@Body() dto: CambiarContrasenaDto) {

    await this.cambiarContrasena.ejecutar(dto);

    return { message: 'Contraseña cambiada' };

  }

}