import { Controller, Get } from '@nestjs/common';

import { GenerarReportes } from '../../application/use-cases/generar-reportes.use-case';

@Controller('reportes')

export class ReportesController {

  constructor(private generarReportes: GenerarReportes) {}

  @Get()

  async obtenerMetricas() {

    return await this.generarReportes.ejecutar();

  }

  @Get('csv')

  async descargarCsv() {

    const csv = await this.generarReportes.generarCsv();

    return csv;

  }

}