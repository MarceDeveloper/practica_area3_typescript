import { Injectable } from '@nestjs/common';

import { Espacio } from '../../domain/entities/espacio.entity';

import { EspacioRepositorio } from '../../domain/interfaces/espacio-repository.interface';

@Injectable()

export class EspacioRepository implements EspacioRepositorio {

  private espacios: Espacio[] = [];

  async encontrarPorId(id: string): Promise<Espacio | null> {

    return this.espacios.find(e => e.id === id) || null;

  }

  async encontrarTodos(): Promise<Espacio[]> {

    return this.espacios;

  }

  async guardar(espacio: Espacio): Promise<void> {

    this.espacios.push(espacio);

  }

  async actualizar(espacio: Espacio): Promise<void> {

    const index = this.espacios.findIndex(e => e.id === espacio.id);

    if (index !== -1) {

      this.espacios[index] = espacio;

    }

  }

  async eliminar(id: string): Promise<void> {

    this.espacios = this.espacios.filter(e => e.id !== id);

  }

}