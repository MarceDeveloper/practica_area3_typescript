import { Module } from '@nestjs/common';

import { AuthController } from '../controllers/auth.controller';

import { ReservaController } from '../controllers/reserva.controller';

import { EspacioController } from '../controllers/espacio.controller';

import { RegistrarUsuario } from '../../application/use-cases/registrar-usuario.use-case';

import { IniciarSesion } from '../../application/use-cases/iniciar-sesion.use-case';

import { CrearReserva } from '../../application/use-cases/crear-reserva.use-case';

import { AprobarReserva } from '../../application/use-cases/aprobar-reserva.use-case';

import { CrearEspacio } from '../../application/use-cases/crear-espacio.use-case';

import { ListarEspacios } from '../../application/use-cases/listar-espacios.use-case';

import { UsuarioRepository } from '../../infrastructure/repositories/usuario.repository';

import { ReservaRepository } from '../../infrastructure/repositories/reserva.repository';

import { EspacioRepository } from '../../infrastructure/repositories/espacio.repository';

@Module({

  controllers: [AuthController, ReservaController, EspacioController],

  providers: [RegistrarUsuario, IniciarSesion, CrearReserva, AprobarReserva, CrearEspacio, ListarEspacios, UsuarioRepository, ReservaRepository, EspacioRepository],

})

export class SreoModule {}