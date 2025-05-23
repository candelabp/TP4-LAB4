import React, { useState } from 'react'
import '../styles/ModalRegistroLogin.css';
import { Usuario } from '../Entidades/Usuario';
import { Rol } from '../Entidades/Rol';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
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

        // Validaciones del lado del cliente
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
            const usuario = new Usuario(nombreUsuario, clave, rol);
            const response = await fetch("http://localhost:8080/api/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });

            const data = await response.json();

            if (response.ok) {
                const usuarioRegistrado = new Usuario(
                    data.nombreUsuario,
                    '',
                    data.rol,
                    data.id
                );
                localStorage.setItem("usuario", JSON.stringify(usuarioRegistrado));

                
                Swal.fire({
                    position: "bottom-end",
                    icon: "success",
                    title: "Registro exitoso",
                    showConfirmButton: false,
                    timer: 1500,
                    width: "20em"
                });

                onClose();
                window.location.reload();
            } else {
                
                Swal.fire({
                    position: "bottom-end",
                    icon: "error",
                    title: data.mensaje,
                    showConfirmButton: false,
                    timer: 2000,
                    width: "22em"
                });
            }
        } catch (err) {
            console.error("Error al registrarse: ", err);
            Swal.fire({
                position: "bottom-end",
                icon: "error",
                title: "Error de conexión con el servidor",
                showConfirmButton: false,
                timer: 2000,
                width: "22em"
            });
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
                    <label htmlFor="nombreUsuario">Nombre de Usuario</label>
                    <input type="text" id="nombreUsuario" placeholder="Ingrese un nombre de usuario" value={nombreUsuario} onChange={e => setNombreUsuario(e.target.value)} disabled={isLoading} />

                    <label htmlFor="contrasenia">Contraseña</label>
                    <input type="password" id="contrasenia" placeholder="Ingrese una contraseña" value={clave} onChange={e => setClave(e.target.value)} disabled={isLoading} />

                    <label htmlFor="repetirContraseña">Repetir Contraseña</label>
                    <input type="password" id="repetirContraseña" placeholder="Repita la contraseña" value={repetirContrasenia} onChange={e => setRepetirContrasenia(e.target.value)} disabled={isLoading} />
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
                    <button type="button" className='btnRedirigir' onClick={(e) => {
                        e.preventDefault();
                        onOpenLogin();
                    }}
                        disabled={isLoading}
                    >¿Ya tenés cuenta? Iniciá sesión</button>
                </div>
            </form>
        </div>
    )
}

export default ModalRegistro