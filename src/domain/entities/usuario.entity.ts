export class Usuario {
  constructor(
    public id: string,
    public nombre: string,
    public email: string,
    public contrasenaHash: string,
    public rol: string,
  ) {}
}