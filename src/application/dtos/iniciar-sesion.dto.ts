import { ApiProperty } from '@nestjs/swagger';

export class IniciarSesionDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  contrasena: string;
}