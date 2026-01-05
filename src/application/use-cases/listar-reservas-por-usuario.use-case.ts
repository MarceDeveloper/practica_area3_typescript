import { Injectable } from '@nestjs/common';
import { Reserva } from '../../domain/entities/reserva.entity';
import { ReservaRepository } from '../../infrastructure/repositories/reserva.repository';

@Injectable()
export class ListarReservasPorUsuario {
  constructor(private readonly reservaRepository: ReservaRepository) {}

  async ejecutar(usuarioId: string): Promise<Reserva[]> {
    return this.reservaRepository.encontrarPorUsuarioId(usuarioId);
  }
}