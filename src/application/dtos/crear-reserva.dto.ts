import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CrearReservaDto {
  @ApiProperty({ example: '0.5277713739457459' })
  usuarioId: string;

  @ApiProperty({ example: '0.3002585781617646' })
  espacioId: string;

  @ApiProperty({ example: '2026-01-10T10:00:00.000Z' })
  @Transform(({ value }) => new Date(value))
  fechaInicio: Date;

  @ApiProperty({ example: '2026-01-10T12:00:00.000Z' })
  @Transform(({ value }) => new Date(value))
  fechaFin: Date;
}