import { Injectable } from '@nestjs/common';

import { Reserva } from '../../domain/entities/reserva.entity';

import { ReservaRepositorio } from '../../domain/interfaces/reserva-repository.interface';

@Injectable()

export class ReservaRepository implements ReservaRepositorio {

  private reservas: Reserva[] = [];

  async encontrarPorId(id: string): Promise<Reserva | null> {

    return this.reservas.find(r => r.id === id) || null;

  }

  async encontrarPorUsuarioId(usuarioId: string): Promise<Reserva[]> {

    return this.reservas.filter(r => r.usuarioId === usuarioId);

  }

  async encontrarPorEspacioId(espacioId: string): Promise<Reserva[]> {

    return this.reservas.filter(r => r.espacioId === espacioId);

  }

  async guardar(reserva: Reserva): Promise<void> {

    this.reservas.push(reserva);

  }

  async actualizar(reserva: Reserva): Promise<void> {

    const index = this.reservas.findIndex(r => r.id === reserva.id);

    if (index !== -1) {

      this.reservas[index] = reserva;

    }

  }

  async eliminar(id: string): Promise<void> {

    this.reservas = this.reservas.filter(r => r.id !== id);

  }

}