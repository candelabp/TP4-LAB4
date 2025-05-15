import { Rol } from "./Rol";    

export class Usuario {
  id?: number;
  nombreUsuario: string;
  clave: string;
  rol?: Rol;

  constructor(nombreUsuario: string, clave: string, rol?: Rol, id?: number) {
    this.nombreUsuario = nombreUsuario;
    this.clave = clave;
    this.rol = rol;
    this.id = id;
  }
}