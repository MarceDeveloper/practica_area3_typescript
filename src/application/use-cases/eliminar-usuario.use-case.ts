import { Injectable } from '@nestjs/common';

import { UsuarioRepository } from '../../infrastructure/repositories/usuario.repository';

import { EliminarUsuarioDto } from '../dtos/eliminar-usuario.dto';

@Injectable()

export class EliminarUsuario {

  constructor(private usuarioRepository: UsuarioRepository) {}

  async ejecutar(dto: EliminarUsuarioDto): Promise<void> {

    const usuarioExistente = await this.usuarioRepository.encontrarPorId(dto.id);

    if (!usuarioExistente) {

      throw new Error('Usuario no encontrado');

    }

    await this.usuarioRepository.eliminar(dto.id);

  }

}