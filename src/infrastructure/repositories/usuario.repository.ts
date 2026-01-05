import { Injectable } from '@nestjs/common';

import { Usuario } from '../../domain/entities/usuario.entity';

import { UsuarioRepositorio } from '../../domain/interfaces/usuario-repository.interface';

@Injectable()

export class UsuarioRepository implements UsuarioRepositorio {

  private usuarios: Usuario[] = [];

  async encontrarPorId(id: string): Promise<Usuario | null> {

    return this.usuarios.find(u => u.id === id) || null;

  }

  async encontrarPorEmail(email: string): Promise<Usuario | null> {

    return this.usuarios.find(u => u.email === email) || null;

  }

  async encontrarTodos(): Promise<Usuario[]> {

    return this.usuarios;

  }

  async guardar(usuario: Usuario): Promise<void> {

    this.usuarios.push(usuario);

  }

}