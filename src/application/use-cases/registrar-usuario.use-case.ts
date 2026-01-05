import { Injectable, BadRequestException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { Usuario } from '../../domain/entities/usuario.entity';

import { UsuarioRepository } from '../../infrastructure/repositories/usuario.repository';

import { CrearUsuarioDto } from '../dtos/crear-usuario.dto';

@Injectable()

export class RegistrarUsuario {

  constructor(private usuarioRepository: UsuarioRepository) {}

  async ejecutar(dto: CrearUsuarioDto): Promise<void> {

    const usuarioExistente = await this.usuarioRepository.encontrarPorEmail(dto.email);

    if (usuarioExistente) {

      throw new BadRequestException('Usuario ya existe');

    }

    const contrasenaHash = await this.hashContrasena(dto.contrasena);

    const usuario = new Usuario(

      this.generarId(),

      dto.nombre,

      dto.email,

      contrasenaHash,

      dto.rol,

    );

    await this.usuarioRepository.guardar(usuario);

  }

  private async hashContrasena(contrasena: string): Promise<string> {

    const saltRounds = 10;

    return bcrypt.hash(contrasena, saltRounds);

  }

  private generarId(): string {

    return Math.random().toString();

  }

}