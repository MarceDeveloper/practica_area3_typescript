import { Injectable } from '@nestjs/common';

import { createObjectCsvStringifier } from 'csv-writer';

import { ReservaRepository } from '../../infrastructure/repositories/reserva.repository';

import { EspacioRepository } from '../../infrastructure/repositories/espacio.repository';

@Injectable()

export class GenerarReportes {

  constructor(

    private reservaRepository: ReservaRepository,

    private espacioRepository: EspacioRepository,

  ) {}

  async ejecutar() {

    const todasReservas = await this.reservaRepository.encontrarTodas();

    const totalReservas = todasReservas.length;

    const aprobadas = todasReservas.filter(r => r.estado === 'aprobada').length;

    const espacios = await this.espacioRepository.encontrarTodos();

    const totalEspacios = espacios.length;

    return {

      totalReservas,

      reservasAprobadas: aprobadas,

      totalEspacios,

      tasaOcupacion: totalEspacios > 0 ? (aprobadas / totalEspacios) * 100 : 0,

    };

  }

  async generarCsv(): Promise<string> {

    const todasReservas = await this.reservaRepository.encontrarTodas();

    const csvStringifier = createObjectCsvStringifier({

      header: [

        { id: 'id', title: 'ID' },

        { id: 'usuarioId', title: 'Usuario ID' },

        { id: 'espacioId', title: 'Espacio ID' },

        { id: 'fechaInicio', title: 'Fecha Inicio' },

        { id: 'fechaFin', title: 'Fecha Fin' },

        { id: 'estado', title: 'Estado' },

      ],

    });

    return csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(todasReservas);

  }

}