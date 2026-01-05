import { Controller, Post, Get, Body, Query } from '@nestjs/common';

import { CrearEspacio } from '../../application/use-cases/crear-espacio.use-case';

import { ListarEspacios } from '../../application/use-cases/listar-espacios.use-case';

import { CrearEspacioDto } from '../../application/dtos/crear-espacio.dto';

@Controller('espacios')

export class EspacioController {

  constructor(

    private crearEspacio: CrearEspacio,

    private listarEspacios: ListarEspacios,

  ) {}

  @Post()

  async crear(@Body() dto: CrearEspacioDto) {

    await this.crearEspacio.ejecutar(dto);

    return { message: 'Espacio creado' };

  }

  @Get()

  async listar(@Query() query: any) {

    const espacios = await this.listarEspacios.ejecutar();

    let filtrados = espacios;

    if (query.tipo) {

      filtrados = filtrados.filter(e => e.tipo === query.tipo);

    }

    if (query.capacidad) {

      filtrados = filtrados.filter(e => e.capacidad >= parseInt(query.capacidad));

    }

    return filtrados;

  }

}