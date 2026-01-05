import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsIn } from 'class-validator';

export class CrearUsuarioDto {
  @ApiProperty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  contrasena: string;

  @ApiProperty()
  @IsIn(['miembro', 'administrador'])
  rol: string;
}