import React, { useState } from 'react'
import '../styles/ModalRegistroLogin.css';
import { Usuario } from '../Entidades/Usuario';
import { Rol } from '../Entidades/Rol';

type Props = {
    onClose: () => void;
    onOpenLogin: () => void;
};

const ModalRegistro: React.FC<Props> = ({ onClose, onOpenLogin }) => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [clave, setClave] = useState('');
    const [repetirContrasenia, setRepetirContrasenia] = useState('');
    const [rol, setRol] = useState<Rol>(Rol.CLIENTE);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');


    const handleRegistrarse = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!nombreUsuario || !clave || !repetirContrasenia) {
            setError("Por favor completa todos los campos");
            return;
        }
        if (nombreUsuario.length < 3) {
            setError("El nombre de usuario debe tener al menos 3 caracteres");
            return;
        }
        if (clave.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return;
        }
        if (clave !== repetirContrasenia) {
            setError("Las contraseñas no coinciden");
            return;
        }

        setIsLoading(true);

        try {
            const usuario = new Usuario(nombreUsuario, clave, rol)
            const response = await fetch("http://localhost:8080/api/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });
            if (response.ok) {
                const data = await response.json();
                const usuarioRegistrado = new Usuario(
                    data.nombreUsuario,
                    '',
                    data.rol,
                    data.id
                );
                localStorage.setItem("usuario", JSON.stringify(usuarioRegistrado));
                alert("Registro exitoso");
                onClose();
                window.location.reload();
            } else {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Error al registrarse");            
            }
        } catch (err) {
            console.error("Error al registrarse: ", err);
            alert("Error al registrarse");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <button onClick={onClose} className="btnCerrar" type="button" disabled={isLoading}>✕</button>
            <h2>Registrate</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleRegistrarse}>
                <div className='formRegistroLogin'>
                    <label htmlFor="nombreUsuario">Nombre Usuario</label>
                    <input type="text" id="nombreUsuario" placeholder="Nombre y Apellido" value={nombreUsuario} onChange={e => setNombreUsuario(e.target.value)} disabled={isLoading}/>

                    <label htmlFor="contrasenia">Contraseña</label>
                    <input type="password" id="contrasenia" placeholder="Contraseña" value={clave} onChange={e => setClave(e.target.value)} disabled={isLoading}/>

                    <label htmlFor="repetirContraseña">Repetir Contraseña</label>
                    <input type="password" id="repetirContraseña" placeholder="Repetir Contraseña" value={repetirContrasenia} onChange={e => setRepetirContrasenia(e.target.value)} disabled={isLoading}/>
                </div>

                <div className="checkboxRol">
                    <label>
                        <input type="checkbox" checked={rol === Rol.ADMIN} onChange={() => setRol(Rol.ADMIN)} disabled={isLoading} />
                        Administrador
                    </label>
                    <label>
                        <input type="checkbox" checked={rol === Rol.CLIENTE} onChange={() => setRol(Rol.CLIENTE)} disabled={isLoading} />
                        Cliente
                    </label>
                </div>

                <div className="btnModal">
                    <button className='btnRegistroLogin' type="submit" disabled={isLoading}> {isLoading ? 'Registrando...' : 'Registrarse'} </button>
                    <button className='btnCancelar' onClick={onClose} disabled={isLoading}> Cancelar </button>
                    <button className='btnRedirigir' onClick={onOpenLogin} disabled={isLoading}>¿Ya tenés cuenta? Iniciá sesión</button>
                </div>
            </form>
        </div>
    )
}

export default ModalRegistro