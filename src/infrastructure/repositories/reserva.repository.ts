import { Injectable } from '@nestjs/common';

import * as fs from 'fs';

import { Reserva } from '../../domain/entities/reserva.entity';

import { ReservaRepositorio } from '../../domain/interfaces/reserva-repository.interface';

@Injectable()

export class ReservaRepository implements ReservaRepositorio {

  private filePath = 'reservas.json';

  private reservas: Reserva[] = this.loadFromFile();

  private loadFromFile(): Reserva[] {

    try {

      const data = fs.readFileSync(this.filePath, 'utf8');

      return JSON.parse(data, (key, value) => {

        if (key === 'fechaInicio' || key === 'fechaFin') {

          return new Date(value);

        }

        return value;

      });

    } catch {

      return [];

    }

  }

  private saveToFile() {

    fs.writeFileSync(this.filePath, JSON.stringify(this.reservas, null, 2));

  }

  async encontrarPorId(id: string): Promise<Reserva | null> {

    return this.reservas.find(r => r.id === id) || null;

  }

  async encontrarPorUsuarioId(usuarioId: string): Promise<Reserva[]> {

    return this.reservas.filter(r => r.usuarioId === usuarioId);

  }

  async encontrarPorEspacioId(espacioId: string): Promise<Reserva[]> {

    return this.reservas.filter(r => r.espacioId === espacioId);

  }

  async encontrarTodas(): Promise<Reserva[]> {

    return this.reservas;

  }

  async guardar(reserva: Reserva): Promise<void> {

    this.reservas.push(reserva);

    this.saveToFile();

  }

  async actualizar(reserva: Reserva): Promise<void> {

    const index = this.reservas.findIndex(r => r.id === reserva.id);

    if (index !== -1) {

      this.reservas[index] = reserva;

      this.saveToFile();

    }

  }

  async eliminar(id: string): Promise<void> {

    this.reservas = this.reservas.filter(r => r.id !== id);

    this.saveToFile();

  }

}