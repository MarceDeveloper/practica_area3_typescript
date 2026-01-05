import { Controller, Post, Body } from '@nestjs/common';

import { CrearReserva } from '../../application/use-cases/crear-reserva.use-case';

import { AprobarReserva } from '../../application/use-cases/aprobar-reserva.use-case';

import { CrearReservaDto } from '../../application/dtos/crear-reserva.dto';

import { AprobarReservaDto } from '../../application/dtos/aprobar-reserva.dto';

@Controller('reservas')

export class ReservaController {

  constructor(

    private crearReserva: CrearReserva,

    private aprobarReserva: AprobarReserva,

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

}