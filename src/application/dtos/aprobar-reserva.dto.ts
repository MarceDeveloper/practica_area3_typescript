import { ApiProperty } from '@nestjs/swagger';

export class AprobarReservaDto {
  @ApiProperty()
  reservaId: string;
}