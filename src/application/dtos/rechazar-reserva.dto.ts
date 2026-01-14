import { ApiProperty } from '@nestjs/swagger';

export class RechazarReservaDto {
  @ApiProperty()
  reservaId: string;
}