import React, { useState } from 'react'
import '../styles/ModalRegistroLogin.css';
import Usuario from '../Entidades/Usuario';
import { Rol } from '../Entidades/Rol';

type Props = {
    onClose: () => void;
    onOpenRegistro: () => void;
};

const ModalLogin: React.FC<Props> = ({ onClose, onOpenRegistro }) => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [clave, setClave] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nombreUsuario || !clave) {
            alert("Por favor completa todos los campos");
            return;
        }

        const usuario: Usuario = {
            id: 0,
            nombreUsuario: nombreUsuario,
            clave: clave,
            rol: null
        };

        try {
            const response = await fetch("http://localhost:8080/api/usuarios/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("usuario", JSON.stringify(data));
                alert("Inicio de sesión exitoso");
                onClose();
                window.location.reload();
            } else {
                alert("Error al iniciar sesión");
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert("Error al iniciar sesión");
        }
    }

    return (
        <div>
            <button onClick={onClose} className="btnCerrar">✕</button>
            <h2>Iniciá sesión</h2>
            
            <form onSubmit={handleLogin}>
                <div className="formRegistroLogin">
                    <label htmlFor="nombreUsuario">Usuario</label>
                    <input type="text" id="nombreUsuario" placeholder="Usuario" value={nombreUsuario} onChange={e => setNombreUsuario(e.target.value)} />

                    <label htmlFor="contrasenia">Contraseña</label>
                    <input type="password" id="contrasenia" placeholder="Contraseña" value={clave} onChange={e => setClave(e.target.value)} />
                </div>

                <div className="btnModal">
                    <button className='btnRegistroLogin' type='submit'> Iniciar sesión </button>
                    <button className='btnCancelar' onClick={onClose}> Cancelar </button>
                    <button className='btnRedirigir'
                        onClick={onOpenRegistro}
                    >¿No tenés cuenta? Registrate</button>
                </div>
            </form>
        </div>
    )
}

export default ModalLogin