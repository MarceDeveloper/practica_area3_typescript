import { Module } from '@nestjs/common';

import { AuthController } from '../controllers/auth.controller';

import { ReservaController } from '../controllers/reserva.controller';

import { RegistrarUsuario } from '../../application/use-cases/registrar-usuario.use-case';

import { IniciarSesion } from '../../application/use-cases/iniciar-sesion.use-case';

import { CrearReserva } from '../../application/use-cases/crear-reserva.use-case';

import { AprobarReserva } from '../../application/use-cases/aprobar-reserva.use-case';

import { UsuarioRepository } from '../../infrastructure/repositories/usuario.repository';

import { ReservaRepository } from '../../infrastructure/repositories/reserva.repository';

@Module({

  controllers: [AuthController, ReservaController],

  providers: [RegistrarUsuario, IniciarSesion, CrearReserva, AprobarReserva, UsuarioRepository, ReservaRepository],

})

export class SreoModule {}