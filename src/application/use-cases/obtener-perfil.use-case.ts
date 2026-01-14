import { Injectable } from '@nestjs/common';

import { Usuario } from '../../domain/entities/usuario.entity';

import { UsuarioRepository } from '../../infrastructure/repositories/usuario.repository';

@Injectable()

export class ObtenerPerfil {

  constructor(private usuarioRepository: UsuarioRepository) {}

  async ejecutar(userId: string): Promise<Usuario | null> {

    return await this.usuarioRepository.encontrarPorId(userId);

  }

}