import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom';

export const RutaPrivada = ({children}: {children: ReactNode}) => {
    const usuarioStr = localStorage.getItem("usuario");
    const usuario = usuarioStr ? JSON.parse(usuarioStr) : null;

    return usuario ? children : <Navigate to='/home'/>
}

/*import React, { ReactNode, useState } from 'react'
import Usuario from '../../Entidades/Usuario';
import { Navigate } from 'react-router-dom';

export const RutaPrivada = ({children}: {children: ReactNode}) => {
    const [usuario, setUsuario] = useState<Usuario>(localStorage.getItem("usuario") as unknown as Usuario);
    
    return (usuario ? children : <Navigate to='/home'/>)
}*/
