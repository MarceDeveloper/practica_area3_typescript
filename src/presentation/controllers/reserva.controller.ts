import { Controller, Post, Get, Body, Param, Delete } from '@nestjs/common';

import { CrearReserva } from '../../application/use-cases/crear-reserva.use-case';

import { AprobarReserva } from '../../application/use-cases/aprobar-reserva.use-case';

import { ListarReservasPorUsuario } from '../../application/use-cases/listar-reservas-por-usuario.use-case';

import { ListarReservas } from '../../application/use-cases/listar-reservas.use-case';

import { RechazarReserva } from '../../application/use-cases/rechazar-reserva.use-case';

import { CancelarReserva } from '../../application/use-cases/cancelar-reserva.use-case';

import { CrearReservaDto } from '../../application/dtos/crear-reserva.dto';

import { AprobarReservaDto } from '../../application/dtos/aprobar-reserva.dto';

import { RechazarReservaDto } from '../../application/dtos/rechazar-reserva.dto';

import { CancelarReservaDto } from '../../application/dtos/cancelar-reserva.dto';

@Controller('reservas')

export class ReservaController {

  constructor(

    private crearReserva: CrearReserva,

    private aprobarReserva: AprobarReserva,

    private rechazarReserva: RechazarReserva,

    private cancelarReserva: CancelarReserva,

    private listarReservasPorUsuario: ListarReservasPorUsuario,

    private listarReservas: ListarReservas,

  ) {}

  @Post()

  async crear(@Body() dto: CrearReservaDto) {

    await this.crearReserva.ejecutar(dto);

    return { message: 'Reserva creada' };

  }

  @Post('aprobar')

  async aprobar(@Body() dto: AprobarReservaDto) {

    await this.aprobarReserva.ejecutar(dto);

    return { message: 'Reserva aprobada' };

  }

  @Post('rechazar')

  async rechazar(@Body() dto: RechazarReservaDto) {

    await this.rechazarReserva.ejecutar(dto);

    return { message: 'Reserva rechazada' };

  }

  @Post('cancelar')

  async cancelar(@Body() dto: CancelarReservaDto) {

    await this.cancelarReserva.ejecutar(dto);

    return { message: 'Reserva cancelada' };

  }

  @Get('usuario/:usuarioId')

  async obtenerPorUsuario(@Param('usuarioId') usuarioId: string) {

    return await this.listarReservasPorUsuario.ejecutar(usuarioId);

  }

  @Get()

  async obtenerTodas() {

    return await this.listarReservas.ejecutar();

  }

}