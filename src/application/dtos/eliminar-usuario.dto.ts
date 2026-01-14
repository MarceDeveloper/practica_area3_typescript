import { ApiProperty } from '@nestjs/swagger';

export class EliminarUsuarioDto {
  @ApiProperty()
  id: string;
}