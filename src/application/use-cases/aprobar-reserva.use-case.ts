import { Injectable } from '@nestjs/common';

import { ReservaRepository } from '../../infrastructure/repositories/reserva.repository';

import { AprobarReservaDto } from '../dtos/aprobar-reserva.dto';

@Injectable()

export class AprobarReserva {

  constructor(private reservaRepository: ReservaRepository) {}

  async ejecutar(dto: AprobarReservaDto): Promise<void> {

    const reserva = await this.reservaRepository.encontrarPorId(dto.reservaId);

    if (!reserva) {

      throw new Error('Reserva no encontrada');

    }

    reserva.estado = 'aprobada';

    await this.reservaRepository.actualizar(reserva);

  }

}