import { ApiProperty } from '@nestjs/swagger';

export class EditarEspacioDto {
  @ApiProperty({ required: false })
  nombre?: string;

  @ApiProperty({ required: false })
  capacidad?: number;

  @ApiProperty({ required: false })
  tipo?: string;

  @ApiProperty({ required: false })
  descripcion?: string;
}