import { Rol } from "./Rol";    

export default class Usuario {
    id: number = 0;
    nombreUsuario: string = "";
    clave: string = "";
    rol: Rol | null= null;
}