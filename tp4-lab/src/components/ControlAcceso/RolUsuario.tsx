import { use, useState } from "react";
import { Rol } from "../../Entidades/Rol";
import { Usuario } from "../../Entidades/Usuario";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
    rol: Rol;
}

function RolUsuario({ rol }: Props) {
    const [jsonUsuario, setJsonUsuario] = useState<any>(localStorage.getItem("usuario"));
    const usuarioLogueado: Usuario = JSON.parse(jsonUsuario) as Usuario;

    if (usuarioLogueado && usuarioLogueado.rol === Rol.ADMIN) {
        return <Outlet />
    }else {
        return <Navigate to="/home" />
    }

}

export default RolUsuario;