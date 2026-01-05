import { Usuario } from '../entities/usuario.entity';

export interface UsuarioRepositorio {
  encontrarPorId(id: string): Promise<Usuario | null>;
  encontrarPorEmail(email: string): Promise<Usuario | null>;
  encontrarTodos(): Promise<Usuario[]>;
  guardar(usuario: Usuario): Promise<void>;
}