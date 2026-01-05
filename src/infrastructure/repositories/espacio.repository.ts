import { Injectable } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

import { Espacio } from '../../domain/entities/espacio.entity';

import { EspacioRepositorio } from '../../domain/interfaces/espacio-repository.interface';

@Injectable()

export class EspacioRepository implements EspacioRepositorio {

  private prisma = new PrismaClient();

  async encontrarPorId(id: string): Promise<Espacio | null> {

    const espacio = await this.prisma.espacio.findUnique({ where: { id } });

    return espacio ? new Espacio(espacio.id, espacio.nombre, espacio.capacidad, espacio.tipo, espacio.descripcion) : null;

  }

  async encontrarTodos(): Promise<Espacio[]> {

    const espacios = await this.prisma.espacio.findMany();

    return espacios.map(e => new Espacio(e.id, e.nombre, e.capacidad, e.tipo, e.descripcion));

  }

  async guardar(espacio: Espacio): Promise<void> {

    await this.prisma.espacio.create({

      data: {

        id: espacio.id,

        nombre: espacio.nombre,

        capacidad: espacio.capacidad,

        tipo: espacio.tipo,

        descripcion: espacio.descripcion,

      },

    });

  }

  async actualizar(espacio: Espacio): Promise<void> {

    await this.prisma.espacio.update({

      where: { id: espacio.id },

      data: {

        nombre: espacio.nombre,

        capacidad: espacio.capacidad,

        tipo: espacio.tipo,

        descripcion: espacio.descripcion,

      },

    });

  }

  async eliminar(id: string): Promise<void> {

    await this.prisma.espacio.delete({ where: { id } });

  }

}