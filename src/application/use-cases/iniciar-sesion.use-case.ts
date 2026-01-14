import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { Usuario } from '../../domain/entities/usuario.entity';

import { UsuarioRepository } from '../../infrastructure/repositories/usuario.repository';

import { IniciarSesionDto } from '../dtos/iniciar-sesion.dto';

@Injectable()

export class IniciarSesion {

  constructor(private usuarioRepository: UsuarioRepository) {}

  async ejecutar(dto: IniciarSesionDto): Promise<{ usuario: Usuario; token: string } | null> {

    const usuario = await this.usuarioRepository.encontrarPorEmail(dto.email);

    if (!usuario) {

      return null;

    }

    const esContrasenaValida = await this.verificarContrasena(dto.contrasena, usuario.contrasenaHash);

    if (!esContrasenaValida) {

      return null;

    }

    // Crear un token simple (en producción usar JWT)
    const token = `token_${usuario.id}_${Date.now()}`;

    return { usuario, token };

  }

  private async verificarContrasena(contrasena: string, hash: string): Promise<boolean> {

    return bcrypt.compare(contrasena, hash);

  }

}