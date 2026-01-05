import { Injectable } from '@nestjs/common';

import * as fs from 'fs';

import { Usuario } from '../../domain/entities/usuario.entity';

import { UsuarioRepositorio } from '../../domain/interfaces/usuario-repository.interface';

@Injectable()

export class UsuarioRepository implements UsuarioRepositorio {

  private filePath = 'usuarios.json';

  private usuarios: Usuario[] = this.loadFromFile();

  private loadFromFile(): Usuario[] {

    try {

      const data = fs.readFileSync(this.filePath, 'utf8');

      return JSON.parse(data);

    } catch {

      return [];

    }

  }

  private saveToFile() {

    fs.writeFileSync(this.filePath, JSON.stringify(this.usuarios, null, 2));

  }

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

    this.saveToFile();

  }

}