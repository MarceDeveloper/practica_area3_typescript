import { Reserva } from '../entities/reserva.entity';

export interface ReservaRepositorio {
  encontrarPorId(id: string): Promise<Reserva | null>;
  encontrarPorUsuarioId(usuarioId: string): Promise<Reserva[]>;
  encontrarPorEspacioId(espacioId: string): Promise<Reserva[]>;
  guardar(reserva: Reserva): Promise<void>;
  actualizar(reserva: Reserva): Promise<void>;
  eliminar(id: string): Promise<void>;
}