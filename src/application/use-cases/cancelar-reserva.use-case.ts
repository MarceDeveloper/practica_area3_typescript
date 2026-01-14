import { Injectable } from '@nestjs/common';

import { Reserva } from '../../domain/entities/reserva.entity';

import { ReservaRepository } from '../../infrastructure/repositories/reserva.repository';

import { CancelarReservaDto } from '../dtos/cancelar-reserva.dto';

@Injectable()

export class CancelarReserva {

  constructor(private reservaRepository: ReservaRepository) {}

  async ejecutar(dto: CancelarReservaDto): Promise<void> {

    const reservaExistente = await this.reservaRepository.encontrarPorId(dto.id);

    if (!reservaExistente) {

      throw new Error('Reserva no encontrada');

    }

    if (reservaExistente.estado !== 'pendiente') {

      throw new Error('Solo se pueden cancelar reservas pendientes');

    }

    const reservaCancelada = new Reserva(

      reservaExistente.id,

      reservaExistente.usuarioId,

      reservaExistente.espacioId,

      reservaExistente.fechaInicio,

      reservaExistente.fechaFin,

      'Cancelada',

    );

    await this.reservaRepository.actualizar(reservaCancelada);

  }

}