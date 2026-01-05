import { ApiProperty } from '@nestjs/swagger';

export class CrearEspacioDto {
  @ApiProperty()
  nombre: string;

  @ApiProperty()
  capacidad: number;

  @ApiProperty()
  tipo: string;

  @ApiProperty()
  descripcion: string;
}