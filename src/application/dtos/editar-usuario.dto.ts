import { ApiProperty } from '@nestjs/swagger';

export class EditarUsuarioDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ required: false })
  nombre?: string;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  rol?: string;
}