import { ApiProperty } from '@nestjs/swagger';

export class CrearReservaDto {
  @ApiProperty()
  usuarioId: string;

  @ApiProperty()
  espacioId: string;

  @ApiProperty()
  fechaInicio: Date;

  @ApiProperty()
  fechaFin: Date;
}