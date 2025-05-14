import React, { ReactNode, useState } from 'react'
import Usuario from '../../Entidades/Usuario';
import { Navigate } from 'react-router-dom';

export const RutaPrivada = ({children}: {children: ReactNode}) => {
    const [usuario, setUsuario] = useState<Usuario>(localStorage.getItem("usuario") as unknown as Usuario);
    
    return (usuario ? children : <Navigate to='/home'/>)
}
