import { Injectable } from '@nestjs/common';
import { Reserva } from '../../domain/entities/reserva.entity';
import { ReservaRepository } from '../../infrastructure/repositories/reserva.repository';

@Injectable()
export class ListarReservasPorUsuario {
  constructor(private readonly reservaRepository: ReservaRepository) {}

  async ejecutar(usuarioId: string): Promise<{ pasadas: Reserva[], futuras: Reserva[] }> {
    const reservas = await this.reservaRepository.encontrarPorUsuarioId(usuarioId);
    const ahora = new Date();

    const pasadas = reservas.filter(r => r.fechaFin < ahora);
    const futuras = reservas.filter(r => r.fechaInicio > ahora);

    return { pasadas, futuras };
  }
}