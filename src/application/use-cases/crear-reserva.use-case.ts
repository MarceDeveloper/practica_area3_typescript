import { Injectable, BadRequestException } from '@nestjs/common';

import { Reserva } from '../../domain/entities/reserva.entity';

import { ReservaRepository } from '../../infrastructure/repositories/reserva.repository';

import { EspacioRepository } from '../../infrastructure/repositories/espacio.repository';

import { PoliticasServicio } from '../services/politicas.service';

import { CrearReservaDto } from '../dtos/crear-reserva.dto';

@Injectable()

export class CrearReserva {

  constructor(

    private reservaRepository: ReservaRepository,

    private espacioRepository: EspacioRepository,

    private politicasServicio: PoliticasServicio,

  ) {}

  async ejecutar(dto: CrearReservaDto): Promise<void> {

    if (isNaN(dto.fechaInicio.getTime()) || isNaN(dto.fechaFin.getTime())) {

      throw new BadRequestException('Fechas inválidas');

    }

    if (dto.fechaFin <= dto.fechaInicio) {

      throw new BadRequestException('La fecha de fin debe ser posterior a la fecha de inicio');

    }

    const ahora = new Date();

    const antelacionHoras = (dto.fechaInicio.getTime() - ahora.getTime()) / (1000 * 60 * 60);

    if (antelacionHoras < this.politicasServicio.obtenerMinAntelacion()) {

      throw new BadRequestException('La reserva debe hacerse con al menos ' + this.politicasServicio.obtenerMinAntelacion() + ' horas de antelación');

    }

    const duracionHoras = (dto.fechaFin.getTime() - dto.fechaInicio.getTime()) / (1000 * 60 * 60);

    if (duracionHoras > this.politicasServicio.obtenerMaxDuracion()) {

      throw new BadRequestException('La duración máxima permitida es ' + this.politicasServicio.obtenerMaxDuracion() + ' horas');

    }

    const espacio = await this.espacioRepository.encontrarPorId(dto.espacioId);

    if (!espacio) {

      throw new BadRequestException('Espacio no encontrado');

    }

    const reservasExistentes = await this.reservaRepository.encontrarPorEspacioId(dto.espacioId);

    const hayConflicto = reservasExistentes.some(r =>

      r.estado === 'aprobada' && this.haySuperposicion(r.fechaInicio, r.fechaFin, dto.fechaInicio, dto.fechaFin)

    );

    if (hayConflicto) {

      throw new BadRequestException('Espacio no disponible en ese horario');

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