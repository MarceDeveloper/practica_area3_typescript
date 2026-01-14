import { ApiProperty } from '@nestjs/swagger';

export class CancelarReservaDto {
  @ApiProperty()
  id: string;
}