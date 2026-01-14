import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { Usuario } from '../../domain/entities/usuario.entity';

import { UsuarioRepository } from '../../infrastructure/repositories/usuario.repository';

import { CambiarContrasenaDto } from '../dtos/cambiar-contrasena.dto';

@Injectable()

export class CambiarContrasena {

  constructor(private usuarioRepository: UsuarioRepository) {}

  async ejecutar(dto: CambiarContrasenaDto): Promise<void> {

    const usuarioExistente = await this.usuarioRepository.encontrarPorId(dto.id);

    if (!usuarioExistente) {

      throw new Error('Usuario no encontrado');

    }

    const nuevaContrasenaHash = await this.hashContrasena(dto.nuevaContrasena);

    const usuarioActualizado = new Usuario(

      usuarioExistente.id,

      usuarioExistente.nombre,

      usuarioExistente.email,

      nuevaContrasenaHash,

      usuarioExistente.rol,

    );

    await this.usuarioRepository.actualizar(usuarioActualizado);

  }

  private async hashContrasena(contrasena: string): Promise<string> {

    const saltRounds = 10;

    return bcrypt.hash(contrasena, saltRounds);

  }

}