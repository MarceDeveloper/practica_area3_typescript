import { Injectable } from '@nestjs/common';

import { Reserva } from '../../domain/entities/reserva.entity';

import { ReservaRepository } from '../../infrastructure/repositories/reserva.repository';

import { CrearReservaDto } from '../dtos/crear-reserva.dto';

@Injectable()

export class CrearReserva {

  constructor(private reservaRepository: ReservaRepository) {}

  async ejecutar(dto: CrearReservaDto): Promise<void> {

    const reserva = new Reserva(

      this.generarId(),

      dto.usuarioId,

      dto.espacioId,

      dto.fechaInicio,

      dto.fechaFin,

      'pendiente',

    );

    await this.reservaRepository.guardar(reserva);

  }

  private generarId(): string {

    return Math.random().toString();

  }

}