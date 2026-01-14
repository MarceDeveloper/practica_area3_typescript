import { Injectable } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

import { Usuario } from '../../domain/entities/usuario.entity';

import { UsuarioRepositorio } from '../../domain/interfaces/usuario-repository.interface';

@Injectable()

export class UsuarioRepository implements UsuarioRepositorio {

  private prisma = new PrismaClient();

  async encontrarPorId(id: string): Promise<Usuario | null> {

    const user = await this.prisma.usuario.findUnique({ where: { id } });

    return user ? new Usuario(user.id, user.nombre, user.email, user.contrasenaHash, user.rol) : null;

  }

  async encontrarPorEmail(email: string): Promise<Usuario | null> {

    const user = await this.prisma.usuario.findUnique({ where: { email } });

    return user ? new Usuario(user.id, user.nombre, user.email, user.contrasenaHash, user.rol) : null;

  }

  async encontrarTodos(): Promise<Usuario[]> {

    const users = await this.prisma.usuario.findMany();

    return users.map(u => new Usuario(u.id, u.nombre, u.email, u.contrasenaHash, u.rol));

  }

  async guardar(usuario: Usuario): Promise<void> {

    await this.prisma.usuario.create({

      data: {

        id: usuario.id,

        nombre: usuario.nombre,

        email: usuario.email,

        contrasenaHash: usuario.contrasenaHash,

        rol: usuario.rol,

      },

    });

  }

  async actualizar(usuario: Usuario): Promise<void> {

    await this.prisma.usuario.update({

      where: { id: usuario.id },

      data: {

        nombre: usuario.nombre,

        email: usuario.email,

        contrasenaHash: usuario.contrasenaHash,

        rol: usuario.rol,

      },

    });

  }

  async eliminar(id: string): Promise<void> {

    await this.prisma.usuario.delete({ where: { id } });

  }

}