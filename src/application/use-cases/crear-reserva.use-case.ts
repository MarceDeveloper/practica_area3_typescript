import { Injectable } from '@nestjs/common';

import { Reserva } from '../../domain/entities/reserva.entity';

import { ReservaRepository } from '../../infrastructure/repositories/reserva.repository';

import { EspacioRepository } from '../../infrastructure/repositories/espacio.repository';

import { CrearReservaDto } from '../dtos/crear-reserva.dto';

@Injectable()

export class CrearReserva {

  constructor(

    private reservaRepository: ReservaRepository,

    private espacioRepository: EspacioRepository,

  ) {}

  async ejecutar(dto: CrearReservaDto): Promise<void> {

    const espacio = await this.espacioRepository.encontrarPorId(dto.espacioId);

    if (!espacio) {

      throw new Error('Espacio no encontrado');

    }

    const reservasExistentes = await this.reservaRepository.encontrarPorEspacioId(dto.espacioId);

    const hayConflicto = reservasExistentes.some(r =>

      r.estado === 'aprobada' && this.haySuperposicion(r.fechaInicio, r.fechaFin, dto.fechaInicio, dto.fechaFin)

    );

    if (hayConflicto) {

      throw new Error('Espacio no disponible en ese horario');

    }

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

  private haySuperposicion(fechaInicio1: Date, fechaFin1: Date, fechaInicio2: Date, fechaFin2: Date): boolean {

    return fechaInicio1 < fechaFin2 && fechaFin1 > fechaInicio2;

  }

  private generarId(): string {

    return Math.random().toString();

  }

}