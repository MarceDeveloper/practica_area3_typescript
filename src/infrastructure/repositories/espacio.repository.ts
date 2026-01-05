import { Injectable } from '@nestjs/common';

import * as fs from 'fs';

import { Espacio } from '../../domain/entities/espacio.entity';

import { EspacioRepositorio } from '../../domain/interfaces/espacio-repository.interface';

@Injectable()

export class EspacioRepository implements EspacioRepositorio {

  private filePath = 'espacios.json';

  private espacios: Espacio[] = this.loadFromFile();

  private loadFromFile(): Espacio[] {

    try {

      const data = fs.readFileSync(this.filePath, 'utf8');

      return JSON.parse(data);

    } catch {

      return [];

    }

  }

  private saveToFile() {

    fs.writeFileSync(this.filePath, JSON.stringify(this.espacios, null, 2));

  }

  async encontrarPorId(id: string): Promise<Espacio | null> {

    return this.espacios.find(e => e.id === id) || null;

  }

  async encontrarTodos(): Promise<Espacio[]> {

    return this.espacios;

  }

  async guardar(espacio: Espacio): Promise<void> {

    this.espacios.push(espacio);

    this.saveToFile();

  }

  async actualizar(espacio: Espacio): Promise<void> {

    const index = this.espacios.findIndex(e => e.id === espacio.id);

    if (index !== -1) {

      this.espacios[index] = espacio;

      this.saveToFile();

    }

  }

  async eliminar(id: string): Promise<void> {

    this.espacios = this.espacios.filter(e => e.id !== id);

    this.saveToFile();

  }

}