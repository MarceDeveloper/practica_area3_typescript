import { Injectable } from '@nestjs/common';

import { Espacio } from '../../domain/entities/espacio.entity';

import { EspacioRepository } from '../../infrastructure/repositories/espacio.repository';

import { ListarEspaciosDto } from '../dtos/listar-espacios.dto';

@Injectable()

export class ListarEspacios {

  constructor(private espacioRepository: EspacioRepository) {}

  async ejecutar(dto?: ListarEspaciosDto): Promise<Espacio[]> {

    const espacios = await this.espacioRepository.encontrarTodos();

    if (!dto) return espacios;

    return espacios.filter(espacio => {

      if (dto.tipo && espacio.tipo !== dto.tipo) return false;

      if (dto.capacidad && espacio.capacidad < dto.capacidad) return false;

      if (dto.descripcion && !espacio.descripcion.includes(dto.descripcion)) return false;

      return true;

    });

  }

}