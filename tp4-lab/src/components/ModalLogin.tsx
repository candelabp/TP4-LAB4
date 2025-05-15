import React, { useState } from 'react'
import '../styles/ModalRegistroLogin.css';
import { Usuario } from '../Entidades/Usuario';


type Props = {
    onClose: () => void;
    onOpenRegistro: () => void;
};

const ModalLogin: React.FC<Props> = ({ onClose, onOpenRegistro }) => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [clave, setClave] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!nombreUsuario || !clave) {
            setError("Por favor completa todos los campos");
            return;
        }

        setIsLoading(true);

        try {
            const usuario = new Usuario(nombreUsuario, clave);

            const response = await fetch("http://localhost:8080/api/usuarios/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombreUsuario: usuario.nombreUsuario,
                    clave: usuario.clave
                })
            });

            if (response.ok) {
                const data = await response.json();
                const usuarioLogueado = new Usuario(
                    data.nombreUsuario,
                    '',
                    data.rol,
                    data.id
                );
                localStorage.setItem("usuario", JSON.stringify(usuarioLogueado));
                alert("Inicio de sesión exitoso");
                onClose();
                window.location.reload();
            } else {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Error al iniciar sesión");
            }
        } catch (err) {
            console.error("Error al iniciar sesión:", err);
            alert("Error al iniciar sesión");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <button onClick={onClose} className="btnCerrar" type="button" disabled={isLoading}>✕</button>
            <h2>Iniciá sesión</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleLogin}>
                <div className="formRegistroLogin">
                    <label htmlFor="nombreUsuario">Usuario</label>
                    <input type="text" id="nombreUsuario" placeholder="Usuario" value={nombreUsuario} onChange={e => setNombreUsuario(e.target.value)} disabled={isLoading}/>

                    <label htmlFor="contrasenia">Contraseña</label>
                    <input type="password" id="contrasenia" placeholder="Contraseña" value={clave} onChange={e => setClave(e.target.value)} disabled={isLoading}/>
                </div>

                <div className="btnModal">
                    <button className='btnRegistroLogin' type='submit' disabled={isLoading}>{isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}</button>
                    <button className='btnCancelar' onClick={onClose} disabled={isLoading}> Cancelar </button>
                    <button className='btnRedirigir' onClick={onOpenRegistro} disabled={isLoading}>¿No tenés cuenta? Registrate</button>
                </div>
            </form>
        </div>
    )
}

export default ModalLogin