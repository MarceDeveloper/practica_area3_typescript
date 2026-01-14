import { Injectable } from '@nestjs/common';

import { Usuario } from '../../domain/entities/usuario.entity';

import { UsuarioRepository } from '../../infrastructure/repositories/usuario.repository';

import { EditarUsuarioDto } from '../dtos/editar-usuario.dto';

@Injectable()

export class EditarUsuario {

  constructor(private usuarioRepository: UsuarioRepository) {}

  async ejecutar(dto: EditarUsuarioDto): Promise<void> {

    const usuarioExistente = await this.usuarioRepository.encontrarPorId(dto.id);

    if (!usuarioExistente) {

      throw new Error('Usuario no encontrado');

    }

    const usuarioActualizado = new Usuario(

      usuarioExistente.id,

      dto.nombre ?? usuarioExistente.nombre,

      dto.email ?? usuarioExistente.email,

      usuarioExistente.contrasenaHash, // No cambiar contraseña aquí

      dto.rol ?? usuarioExistente.rol,

    );

    await this.usuarioRepository.actualizar(usuarioActualizado);

  }

}