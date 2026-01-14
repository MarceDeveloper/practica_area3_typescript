import { ApiProperty } from '@nestjs/swagger';

export class ListarEspaciosDto {
  @ApiProperty({ required: false })
  tipo?: string;

  @ApiProperty({ required: false })
  capacidad?: number;

  @ApiProperty({ required: false })
  descripcion?: string;
}