import { Injectable } from '@nestjs/common';

import { Usuario } from '../../domain/entities/usuario.entity';

import { UsuarioRepository } from '../../infrastructure/repositories/usuario.repository';

@Injectable()

export class ListarUsuarios {

  constructor(private usuarioRepository: UsuarioRepository) {}

  async ejecutar(): Promise<Usuario[]> {

    return this.usuarioRepository.encontrarTodos();

  }

}