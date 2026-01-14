import { ApiProperty } from '@nestjs/swagger';

export class ListarEspaciosDto {
  @ApiProperty({ required: false })
  tipo?: string;

  @ApiProperty({ required: false })
  capacidadMin?: number;

  @ApiProperty({ required: false })
  capacidadMax?: number;

  @ApiProperty({ required: false })
  nombre?: string;
}