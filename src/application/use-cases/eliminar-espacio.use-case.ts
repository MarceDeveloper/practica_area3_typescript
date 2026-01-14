import { Injectable } from '@nestjs/common';

import { EspacioRepository } from '../../infrastructure/repositories/espacio.repository';

import { EliminarEspacioDto } from '../dtos/eliminar-espacio.dto';

@Injectable()

export class EliminarEspacio {

  constructor(private espacioRepository: EspacioRepository) {}

  async ejecutar(dto: EliminarEspacioDto): Promise<void> {

    const espacioExistente = await this.espacioRepository.encontrarPorId(dto.id);

    if (!espacioExistente) {

      throw new Error('Espacio no encontrado');

    }

    await this.espacioRepository.eliminar(dto.id);

  }

}