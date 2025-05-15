import React, { useState } from 'react'
import '../styles/ModalRegistroLogin.css';
import Usuario from '../Entidades/Usuario';
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

    const handleRegistrarse = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nombreUsuario || !clave || !repetirContrasenia) {
            alert("Por favor completa todos los campos");
            return;
        }
        if (nombreUsuario.length < 3) {
            alert("El nombre de usuario debe tener al menos 3 caracteres");
            return;
        }
        if (clave !== repetirContrasenia) {
            alert("Las contraseñas no coinciden");
            return;
        }

        const usuario: Usuario = {
            id: 0,
            nombreUsuario: nombreUsuario,
            clave: clave,
            rol: rol
        };

        try {
            const response = await fetch("http://localhost:8080/api/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Usuario registrado:", data);
                localStorage.setItem("usuario", JSON.stringify(data));
                alert("Registro exitoso");
                onClose();
                window.location.reload();
            } else {
                alert("Error al registrarse");
            }
        } catch (error) {
            console.error("Error al registrarse:", error);
            alert("Error al registrarse");
        }
    }

    return (
        <div>
            <button onClick={onClose} className="btnCerrar">✕</button>
            <h2>Registrate</h2>
            
            <form onSubmit={handleRegistrarse}>
                <div className='formRegistroLogin'>
                    <label htmlFor="nombreUsuario">Nombre Usuario</label>
                    <input type="text" id="nombreUsuario" placeholder="Nombre y Apellido" value={nombreUsuario} onChange={e => setNombreUsuario(e.target.value)} />

                    <label htmlFor="contrasenia">Contraseña</label>
                    <input type="password" id="contrasenia" placeholder="Contraseña" value={clave} onChange={e => setClave(e.target.value)} />

                    <label htmlFor="repetirContraseña">Repetir Contraseña</label>
                    <input type="password" id="repetirContraseña" placeholder="Repetir Contraseña" value={repetirContrasenia} onChange={e => setRepetirContrasenia(e.target.value)} />
                </div>

                <div className="checkboxRol">
                    <label>
                        <input
                            type="checkbox"
                            checked={rol === Rol.ADMIN}
                            onChange={() => setRol(Rol.ADMIN)}
                        />
                        Administrador
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={rol === Rol.CLIENTE}
                            onChange={() => setRol(Rol.CLIENTE)}
                        />
                        Cliente
                    </label>
                </div>

                <div className="btnModal">
                    <button className='btnRegistroLogin' type="submit"> Registrarse </button>
                    <button className='btnCancelar' onClick={onClose}> Cancelar </button>
                    <button
                        className='btnRedirigir'
                        onClick={onOpenLogin}
                    >¿Ya tenés cuenta? Iniciá sesión</button>
                </div>
            </form>
        </div>
    )
}

export default ModalRegistro