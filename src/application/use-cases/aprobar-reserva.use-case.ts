import { Injectable, BadRequestException } from '@nestjs/common';

import { ReservaRepository } from '../../infrastructure/repositories/reserva.repository';

import { UsuarioRepository } from '../../infrastructure/repositories/usuario.repository';

import { EmailServicio } from '../services/email.service';

import { AprobarReservaDto } from '../dtos/aprobar-reserva.dto';

@Injectable()

export class AprobarReserva {

  constructor(

    private reservaRepository: ReservaRepository,

    private usuarioRepository: UsuarioRepository,

    private emailServicio: EmailServicio,

  ) {}

  async ejecutar(dto: AprobarReservaDto): Promise<void> {

    const reserva = await this.reservaRepository.encontrarPorId(dto.reservaId);

    if (!reserva) {

      throw new Error('Reserva no encontrada');

    }

    reserva.estado = 'aprobada';

    await this.reservaRepository.actualizar(reserva);

    const usuario = await this.usuarioRepository.encontrarPorId(reserva.usuarioId);

    if (usuario) {

      await this.emailServicio.enviarNotificacion(

        usuario.email,

        `Su reserva para el espacio ${reserva.espacioId} ha sido aprobada.`

      );

    }

  }

}