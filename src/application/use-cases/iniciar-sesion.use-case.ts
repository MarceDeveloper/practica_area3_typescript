import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { Usuario } from '../../domain/entities/usuario.entity';

import { UsuarioRepository } from '../../infrastructure/repositories/usuario.repository';

import { IniciarSesionDto } from '../dtos/iniciar-sesion.dto';

@Injectable()

export class IniciarSesion {

  constructor(private usuarioRepository: UsuarioRepository) {}

  async ejecutar(dto: IniciarSesionDto): Promise<Usuario | null> {

    const usuario = await this.usuarioRepository.encontrarPorEmail(dto.email);

    if (!usuario) {

      return null;

    }

    const esContrasenaValida = await this.verificarContrasena(dto.contrasena, usuario.contrasenaHash);

    if (!esContrasenaValida) {

      return null;

    }

    return usuario;

  }

  private async verificarContrasena(contrasena: string, hash: string): Promise<boolean> {

    return bcrypt.compare(contrasena, hash);

  }

}