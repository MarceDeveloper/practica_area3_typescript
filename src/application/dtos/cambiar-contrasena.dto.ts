import { ApiProperty } from '@nestjs/swagger';

export class CambiarContrasenaDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nuevaContrasena: string;
}