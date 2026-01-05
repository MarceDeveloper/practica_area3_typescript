import { Injectable } from '@nestjs/common';

import { Espacio } from '../../domain/entities/espacio.entity';

import { EspacioRepository } from '../../infrastructure/repositories/espacio.repository';

@Injectable()

export class ListarEspacios {

  constructor(private espacioRepository: EspacioRepository) {}

  async ejecutar(): Promise<Espacio[]> {

    return this.espacioRepository.encontrarTodos();

  }

}