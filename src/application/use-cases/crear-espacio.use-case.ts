import { Injectable } from '@nestjs/common';

import { Espacio } from '../../domain/entities/espacio.entity';

import { EspacioRepository } from '../../infrastructure/repositories/espacio.repository';

import { CrearEspacioDto } from '../dtos/crear-espacio.dto';

@Injectable()

export class CrearEspacio {

  constructor(private espacioRepository: EspacioRepository) {}

  async ejecutar(dto: CrearEspacioDto): Promise<void> {

    const espacio = new Espacio(

      this.generarId(),

      dto.nombre,

      dto.capacidad,

      dto.tipo,

      dto.descripcion,

    );

    await this.espacioRepository.guardar(espacio);

  }

  private generarId(): string {

    return Math.random().toString();

  }

}