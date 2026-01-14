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

      if (dto.capacidadMin && espacio.capacidad < dto.capacidadMin) return false;

      if (dto.capacidadMax && espacio.capacidad > dto.capacidadMax) return false;

      if (dto.nombre && !espacio.nombre.toLowerCase().includes(dto.nombre.toLowerCase())) return false;

      return true;

    });

  }

}