import { Injectable } from '@nestjs/common';
import { Reserva } from '../../domain/entities/reserva.entity';
import { ReservaRepository } from '../../infrastructure/repositories/reserva.repository';

@Injectable()
export class ListarReservas {
  constructor(private readonly reservaRepository: ReservaRepository) {}

  async ejecutar(): Promise<Reserva[]> {
    return this.reservaRepository.encontrarTodas();
  }
}