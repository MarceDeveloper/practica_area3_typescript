import { Injectable, BadRequestException } from '@nestjs/common';

import { ReservaRepository } from '../../infrastructure/repositories/reserva.repository';

import { UsuarioRepository } from '../../infrastructure/repositories/usuario.repository';

import { EmailServicio } from '../services/email.service';

import { RechazarReservaDto } from '../dtos/rechazar-reserva.dto';

@Injectable()

export class RechazarReserva {

  constructor(

    private reservaRepository: ReservaRepository,

    private usuarioRepository: UsuarioRepository,

    private emailServicio: EmailServicio,

  ) {}

  async ejecutar(dto: RechazarReservaDto): Promise<void> {

    const reserva = await this.reservaRepository.encontrarPorId(dto.reservaId);

    if (!reserva) {

      throw new BadRequestException('Reserva no encontrada');

    }

    reserva.estado = 'rechazada';

    await this.reservaRepository.actualizar(reserva);

    const usuario = await this.usuarioRepository.encontrarPorId(reserva.usuarioId);

    if (usuario) {

      await this.emailServicio.enviarNotificacion(

        usuario.email,

        `Su reserva para el espacio ${reserva.espacioId} ha sido rechazada.`

      );

    }

  }

}