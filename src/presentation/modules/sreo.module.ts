import { Module } from '@nestjs/common';

import { AuthController } from '../controllers/auth.controller';

import { RegistrarUsuario } from '../../application/use-cases/registrar-usuario.use-case';

import { UsuarioRepository } from '../../infrastructure/repositories/usuario.repository';

@Module({

  controllers: [AuthController],

  providers: [RegistrarUsuario, UsuarioRepository],

})

export class SreoModule {}