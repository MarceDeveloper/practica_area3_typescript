import { Controller, Get, Query, Res } from '@nestjs/common';
import type { Response } from 'express';

import { GenerarReportes } from '../../application/use-cases/generar-reportes.use-case';

@Controller('reportes')

export class ReportesController {

  constructor(private generarReportes: GenerarReportes) {}

  @Get()

  async obtenerMetricas() {

    return await this.generarReportes.ejecutar();

  }

  @Get('reservas')
  async obtenerReservas(
    @Query('fechaInicio') fechaInicio?: string,
    @Query('fechaFin') fechaFin?: string,
  ) {
    const fechaInicioDate = fechaInicio ? new Date(fechaInicio) : undefined;
    const fechaFinDate = fechaFin ? new Date(fechaFin) : undefined;

    return await this.generarReportes.obtenerReservas(fechaInicioDate, fechaFinDate);
  }

  @Get('espacios-mas-reservados')
  async obtenerEspaciosMasReservados(
    @Query('fechaInicio') fechaInicio?: string,
    @Query('fechaFin') fechaFin?: string,
  ) {
    const fechaInicioDate = fechaInicio ? new Date(fechaInicio) : undefined;
    const fechaFinDate = fechaFin ? new Date(fechaFin) : undefined;

    return await this.generarReportes.obtenerEspaciosMasReservados(fechaInicioDate, fechaFinDate);
  }

  @Get('uso-por-tipo')
  async obtenerUsoPorTipo(
    @Query('fechaInicio') fechaInicio?: string,
    @Query('fechaFin') fechaFin?: string,
  ) {
    const fechaInicioDate = fechaInicio ? new Date(fechaInicio) : undefined;
    const fechaFinDate = fechaFin ? new Date(fechaFin) : undefined;

    return await this.generarReportes.obtenerUsoPorTipo(fechaInicioDate, fechaFinDate);
  }

  @Get('reservas/exportar')
  async exportarReservas(
    @Res() res: Response,
    @Query('formato') formato: 'pdf' | 'excel' = 'pdf',
    @Query('fechaInicio') fechaInicio?: string,
    @Query('fechaFin') fechaFin?: string,
  ) {
    const fechaInicioDate = fechaInicio ? new Date(fechaInicio) : undefined;
    const fechaFinDate = fechaFin ? new Date(fechaFin) : undefined;

    const data = await this.generarReportes.exportarReservas(formato, fechaInicioDate, fechaFinDate);

    if (formato === 'excel') {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="reservas.csv"');
    } else if (formato === 'pdf') {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="reservas.pdf"');
    }

    res.send(data);
  }

  @Get('csv')

  async descargarCsv() {

    const csv = await this.generarReportes.generarCsv();

    return csv;

  }

}