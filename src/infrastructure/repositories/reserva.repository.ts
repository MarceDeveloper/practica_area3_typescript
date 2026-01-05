import { Injectable } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

import { Reserva } from '../../domain/entities/reserva.entity';

import { ReservaRepositorio } from '../../domain/interfaces/reserva-repository.interface';

@Injectable()

export class ReservaRepository implements ReservaRepositorio {

  private prisma = new PrismaClient();

  async encontrarPorId(id: string): Promise<Reserva | null> {

    const reserva = await this.prisma.reserva.findUnique({ where: { id } });

    return reserva ? new Reserva(reserva.id, reserva.usuarioId, reserva.espacioId, reserva.fechaInicio, reserva.fechaFin, reserva.estado) : null;

  }

  async encontrarPorUsuarioId(usuarioId: string): Promise<Reserva[]> {

    const reservas = await this.prisma.reserva.findMany({ where: { usuarioId } });

    return reservas.map(r => new Reserva(r.id, r.usuarioId, r.espacioId, r.fechaInicio, r.fechaFin, r.estado));

  }

  async encontrarPorEspacioId(espacioId: string): Promise<Reserva[]> {

    const reservas = await this.prisma.reserva.findMany({ where: { espacioId } });

    return reservas.map(r => new Reserva(r.id, r.usuarioId, r.espacioId, r.fechaInicio, r.fechaFin, r.estado));

  }

  async encontrarTodas(): Promise<Reserva[]> {

    const reservas = await this.prisma.reserva.findMany();

    return reservas.map(r => new Reserva(r.id, r.usuarioId, r.espacioId, r.fechaInicio, r.fechaFin, r.estado));

  }

  async guardar(reserva: Reserva): Promise<void> {

    await this.prisma.reserva.create({

      data: {

        id: reserva.id,

        usuarioId: reserva.usuarioId,

        espacioId: reserva.espacioId,

        fechaInicio: reserva.fechaInicio,

        fechaFin: reserva.fechaFin,

        estado: reserva.estado,

      },

    });

  }

  async actualizar(reserva: Reserva): Promise<void> {

    await this.prisma.reserva.update({

      where: { id: reserva.id },

      data: {

        usuarioId: reserva.usuarioId,

        espacioId: reserva.espacioId,

        fechaInicio: reserva.fechaInicio,

        fechaFin: reserva.fechaFin,

        estado: reserva.estado,

      },

    });

  }

  async eliminar(id: string): Promise<void> {

    await this.prisma.reserva.delete({ where: { id } });

  }

}