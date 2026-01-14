import { Injectable } from '@nestjs/common';

import { createObjectCsvStringifier } from 'csv-writer';

import { ReservaRepository } from '../../infrastructure/repositories/reserva.repository';

import { EspacioRepository } from '../../infrastructure/repositories/espacio.repository';

import { UsuarioRepository } from '../../infrastructure/repositories/usuario.repository';

@Injectable()

export class GenerarReportes {

  constructor(

    private reservaRepository: ReservaRepository,

    private espacioRepository: EspacioRepository,

    private usuarioRepository: UsuarioRepository,

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

  async obtenerReservas(fechaInicio?: Date, fechaFin?: Date) {
    let reservas = await this.reservaRepository.encontrarTodas();

    // Filter by date range if provided
    if (fechaInicio || fechaFin) {
      reservas = reservas.filter(reserva => {
        const reservaFecha = new Date(reserva.fechaInicio);
        if (fechaInicio && reservaFecha < fechaInicio) return false;
        if (fechaFin && reservaFecha > fechaFin) return false;
        return true;
      });
    }

    // Populate user and space data
    const reservasConDatos = await Promise.all(
      reservas.map(async (reserva) => {
        const usuario = await this.usuarioRepository.encontrarPorId(reserva.usuarioId);
        const espacio = await this.espacioRepository.encontrarPorId(reserva.espacioId);

        return {
          ...reserva,
          usuario: usuario ? { nombre: usuario.nombre, email: usuario.email } : null,
          espacio: espacio ? { nombre: espacio.nombre, tipo: espacio.tipo } : null,
        };
      })
    );

    return {
      id: 'reporte-reservas',
      titulo: 'Reporte de Reservas',
      descripcion: 'Listado de todas las reservas',
      fechaGeneracion: new Date(),
      datos: reservasConDatos,
    };
  }

  async obtenerEspaciosMasReservados(fechaInicio?: Date, fechaFin?: Date) {
    const reservas = await this.reservaRepository.encontrarTodas();
    const espacios = await this.espacioRepository.encontrarTodos();

    // Filter reservations by date if provided
    let reservasFiltradas = reservas;
    if (fechaInicio || fechaFin) {
      reservasFiltradas = reservas.filter(reserva => {
        const reservaFecha = new Date(reserva.fechaInicio);
        if (fechaInicio && reservaFecha < fechaInicio) return false;
        if (fechaFin && reservaFecha > fechaFin) return false;
        return true;
      });
    }

    // Count reservations per space
    const conteoPorEspacio = reservasFiltradas.reduce((acc, reserva) => {
      acc[reserva.espacioId] = (acc[reserva.espacioId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Create report data
    const datos = espacios
      .map(espacio => ({
        id: espacio.id,
        nombre: espacio.nombre,
        tipo: espacio.tipo,
        totalReservas: conteoPorEspacio[espacio.id] || 0,
      }))
      .sort((a, b) => b.totalReservas - a.totalReservas);

    return {
      id: 'reporte-espacios',
      titulo: 'Espacios Más Reservados',
      descripcion: 'Ranking de espacios por número de reservas',
      fechaGeneracion: new Date(),
      datos,
    };
  }

  async obtenerUsoPorTipo(fechaInicio?: Date, fechaFin?: Date) {
    const reservas = await this.reservaRepository.encontrarTodas();
    const espacios = await this.espacioRepository.encontrarTodos();

    // Filter reservations by date if provided
    let reservasFiltradas = reservas;
    if (fechaInicio || fechaFin) {
      reservasFiltradas = reservas.filter(reserva => {
        const reservaFecha = new Date(reserva.fechaInicio);
        if (fechaInicio && reservaFecha < fechaInicio) return false;
        if (fechaFin && reservaFecha > fechaFin) return false;
        return true;
      });
    }

    // Create space type map
    const tipoPorEspacio = espacios.reduce((acc, espacio) => {
      acc[espacio.id] = espacio.tipo;
      return acc;
    }, {} as Record<string, string>);

    // Calculate usage by type
    const usoPorTipo = reservasFiltradas.reduce((acc, reserva) => {
      const tipo = tipoPorEspacio[reserva.espacioId] || 'Desconocido';
      if (!acc[tipo]) {
        acc[tipo] = { totalReservas: 0, totalHoras: 0 };
      }
      acc[tipo].totalReservas += 1;

      // Calculate hours
      const fechaInicioReserva = new Date(reserva.fechaInicio);
      const fechaFinReserva = new Date(reserva.fechaFin);
      const horas = (fechaFinReserva.getTime() - fechaInicioReserva.getTime()) / (1000 * 60 * 60);
      acc[tipo].totalHoras += horas;

      return acc;
    }, {} as Record<string, { totalReservas: number; totalHoras: number }>);

    const datos = Object.entries(usoPorTipo).map(([tipo, stats]) => ({
      tipo,
      totalReservas: stats.totalReservas,
      totalHoras: Math.round(stats.totalHoras * 100) / 100, // Round to 2 decimal places
    }));

    return {
      id: 'reporte-uso',
      titulo: 'Uso por Tipo de Espacio',
      descripcion: 'Estadísticas de uso por tipo de espacio',
      fechaGeneracion: new Date(),
      datos,
    };
  }

  async exportarReservas(formato: 'pdf' | 'excel', fechaInicio?: Date, fechaFin?: Date) {
    const reporte = await this.obtenerReservas(fechaInicio, fechaFin);

    if (formato === 'excel') {
      const csvStringifier = createObjectCsvStringifier({
        header: [
          { id: 'id', title: 'ID' },
          { id: 'usuario.nombre', title: 'Usuario' },
          { id: 'espacio.nombre', title: 'Espacio' },
          { id: 'fechaInicio', title: 'Fecha Inicio' },
          { id: 'fechaFin', title: 'Fecha Fin' },
          { id: 'estado', title: 'Estado' },
        ],
      });

      const records = reporte.datos.map(item => ({
        id: item.id,
        'usuario.nombre': item.usuario?.nombre || 'N/A',
        'espacio.nombre': item.espacio?.nombre || 'N/A',
        fechaInicio: item.fechaInicio,
        fechaFin: item.fechaFin,
        estado: item.estado,
      }));

      return csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records);
    } else if (formato === 'pdf') {
      // Return HTML content that can be saved as PDF
      const html = `
        <html>
        <head>
          <title>Reporte de Reservas</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            tr:nth-child(even) { background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <h1>Reporte de Reservas</h1>
          <p>Fecha de generación: ${reporte.fechaGeneracion.toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Espacio</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${reporte.datos.map(item => `
                <tr>
                  <td>${item.id}</td>
                  <td>${item.usuario?.nombre || 'N/A'}</td>
                  <td>${item.espacio?.nombre || 'N/A'}</td>
                  <td>${new Date(item.fechaInicio).toLocaleString()}</td>
                  <td>${new Date(item.fechaFin).toLocaleString()}</td>
                  <td>${item.estado}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
        </html>
      `;
      return html;
    }

    return this.generarCsv();
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