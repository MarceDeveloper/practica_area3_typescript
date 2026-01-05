export class Reserva {
  constructor(
    public id: string,
    public usuarioId: string,
    public espacioId: string,
    public fechaInicio: Date,
    public fechaFin: Date,
    public estado: string,
  ) {}
}