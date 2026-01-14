import { Controller, Get, Put, Delete, Body, Param, Post } from '@nestjs/common';

import { ListarUsuarios } from '../../application/use-cases/listar-usuarios.use-case';
import { EditarUsuario } from '../../application/use-cases/editar-usuario.use-case';
import { EliminarUsuario } from '../../application/use-cases/eliminar-usuario.use-case';
import { CambiarContrasena } from '../../application/use-cases/cambiar-contrasena.use-case';
import { RegistrarUsuario } from '../../application/use-cases/registrar-usuario.use-case';

import { CrearUsuarioDto } from '../../application/dtos/crear-usuario.dto';
import { EditarUsuarioDto } from '../../application/dtos/editar-usuario.dto';
import { EliminarUsuarioDto } from '../../application/dtos/eliminar-usuario.dto';
import { CambiarContrasenaDto } from '../../application/dtos/cambiar-contrasena.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private listarUsuarios: ListarUsuarios,
    private editarUsuario: EditarUsuario,
    private eliminarUsuario: EliminarUsuario,
    private cambiarContrasena: CambiarContrasena,
    private registrarUsuario: RegistrarUsuario,
  ) {}

  @Get()
  async listar() {
    return await this.listarUsuarios.ejecutar();
  }

  @Post()
  async crear(@Body() dto: CrearUsuarioDto) {
    await this.registrarUsuario.ejecutar(dto);
    return { message: 'Usuario creado' };
  }

  @Put(':id')
  async editar(@Param('id') id: string, @Body() dto: EditarUsuarioDto) {
    await this.editarUsuario.ejecutar({ ...dto, id });
    return { message: 'Usuario editado' };
  }

  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    await this.eliminarUsuario.ejecutar({ id });
    return { message: 'Usuario eliminado' };
  }

  @Post(':id/cambiar-contrasena')
  async cambiar(@Param('id') id: string, @Body() dto: CambiarContrasenaDto) {
    await this.cambiarContrasena.ejecutar({ ...dto, id });
    return { message: 'Contraseña cambiada' };
  }
}