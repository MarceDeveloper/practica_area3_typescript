import { Injectable } from '@nestjs/common';

import { Espacio } from '../../domain/entities/espacio.entity';

import { EspacioRepository } from '../../infrastructure/repositories/espacio.repository';

import { EditarEspacioDto } from '../dtos/editar-espacio.dto';

@Injectable()

export class EditarEspacio {

  constructor(private espacioRepository: EspacioRepository) {}

  async ejecutar(id: string, dto: EditarEspacioDto): Promise<void> {

    const espacioExistente = await this.espacioRepository.encontrarPorId(id);

    if (!espacioExistente) {

      throw new Error('Espacio no encontrado');

    }

    const espacioActualizado = new Espacio(

      espacioExistente.id,

      dto.nombre ?? espacioExistente.nombre,

      dto.capacidad ?? espacioExistente.capacidad,

      dto.tipo ?? espacioExistente.tipo,

      dto.descripcion ?? espacioExistente.descripcion,

    );

    await this.espacioRepository.actualizar(espacioActualizado);

  }

}