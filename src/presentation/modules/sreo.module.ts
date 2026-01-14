import { Module } from '@nestjs/common';

import { AuthController } from '../controllers/auth.controller';

import { ReservaController } from '../controllers/reserva.controller';

import { EspacioController } from '../controllers/espacio.controller';

import { ReportesController } from '../controllers/reportes.controller';

import { UsuariosController } from '../controllers/usuarios.controller';

import { RegistrarUsuario } from '../../application/use-cases/registrar-usuario.use-case';

import { IniciarSesion } from '../../application/use-cases/iniciar-sesion.use-case';

import { ObtenerPerfil } from '../../application/use-cases/obtener-perfil.use-case';

import { ListarUsuarios } from '../../application/use-cases/listar-usuarios.use-case';

import { EditarUsuario } from '../../application/use-cases/editar-usuario.use-case';

import { EliminarUsuario } from '../../application/use-cases/eliminar-usuario.use-case';

import { CambiarContrasena } from '../../application/use-cases/cambiar-contrasena.use-case';

import { CrearReserva } from '../../application/use-cases/crear-reserva.use-case';

import { AprobarReserva } from '../../application/use-cases/aprobar-reserva.use-case';

import { RechazarReserva } from '../../application/use-cases/rechazar-reserva.use-case';

import { CancelarReserva } from '../../application/use-cases/cancelar-reserva.use-case';

import { ListarReservasPorUsuario } from '../../application/use-cases/listar-reservas-por-usuario.use-case';

import { ListarReservas } from '../../application/use-cases/listar-reservas.use-case';

import { CrearEspacio } from '../../application/use-cases/crear-espacio.use-case';

import { ListarEspacios } from '../../application/use-cases/listar-espacios.use-case';

import { EditarEspacio } from '../../application/use-cases/editar-espacio.use-case';

import { EliminarEspacio } from '../../application/use-cases/eliminar-espacio.use-case';

import { GenerarReportes } from '../../application/use-cases/generar-reportes.use-case';

import { PoliticasServicio } from '../../application/services/politicas.service';

import { EmailServicio } from '../../application/services/email.service';

import { UsuarioRepository } from '../../infrastructure/repositories/usuario.repository';

import { ReservaRepository } from '../../infrastructure/repositories/reserva.repository';

import { EspacioRepository } from '../../infrastructure/repositories/espacio.repository';

@Module({

  controllers: [AuthController, ReservaController, EspacioController, ReportesController, UsuariosController],

  providers: [RegistrarUsuario, IniciarSesion, ObtenerPerfil, ListarUsuarios, EditarUsuario, EliminarUsuario, CambiarContrasena, CrearReserva, AprobarReserva, RechazarReserva, CancelarReserva, ListarReservasPorUsuario, ListarReservas, CrearEspacio, ListarEspacios, EditarEspacio, EliminarEspacio, GenerarReportes, PoliticasServicio, EmailServicio, UsuarioRepository, ReservaRepository, EspacioRepository],

})

export class SreoModule {}