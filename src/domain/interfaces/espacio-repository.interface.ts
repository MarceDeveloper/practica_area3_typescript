import { Espacio } from '../entities/espacio.entity';

export interface EspacioRepositorio {
  encontrarPorId(id: string): Promise<Espacio | null>;
  encontrarTodos(): Promise<Espacio[]>;
  guardar(espacio: Espacio): Promise<void>;
  actualizar(espacio: Espacio): Promise<void>;
  eliminar(id: string): Promise<void>;
}