import { Controller, Post, Get, Put, Delete, Body, Query, Param } from '@nestjs/common';

import { CrearEspacio } from '../../application/use-cases/crear-espacio.use-case';

import { ListarEspacios } from '../../application/use-cases/listar-espacios.use-case';

import { EditarEspacio } from '../../application/use-cases/editar-espacio.use-case';

import { EliminarEspacio } from '../../application/use-cases/eliminar-espacio.use-case';

import { CrearEspacioDto } from '../../application/dtos/crear-espacio.dto';

import { EditarEspacioDto } from '../../application/dtos/editar-espacio.dto';

import { EliminarEspacioDto } from '../../application/dtos/eliminar-espacio.dto';

import { ListarEspaciosDto } from '../../application/dtos/listar-espacios.dto';

@Controller('espacios')

export class EspacioController {

  constructor(

    private crearEspacio: CrearEspacio,

    private listarEspacios: ListarEspacios,

    private editarEspacio: EditarEspacio,

    private eliminarEspacio: EliminarEspacio,

  ) {}

  @Post()

  async crear(@Body() dto: CrearEspacioDto) {

    await this.crearEspacio.ejecutar(dto);

    return { message: 'Espacio creado' };

  }

  @Get()

  async listar(@Query() query: ListarEspaciosDto) {

    return this.listarEspacios.ejecutar(query);

  }

  @Put(':id')

  async editar(@Param('id') id: string, @Body() dto: EditarEspacioDto) {

    await this.editarEspacio.ejecutar(id, dto);

    return { message: 'Espacio editado' };

  }

  @Delete(':id')

  async eliminar(@Param('id') id: string) {

    await this.eliminarEspacio.ejecutar({ id });

    return { message: 'Espacio eliminado' };

  }

}