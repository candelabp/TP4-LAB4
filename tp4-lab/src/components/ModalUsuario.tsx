import React, { useState } from 'react';
import { Usuario } from '../Entidades/Usuario';
import '../styles/modalUsuario.css';

type Props = {
  usuario: Usuario;
  onClose: () => void;
};

const ModalUsuario: React.FC<Props> = ({ usuario, onClose }) => {
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const handleCerrarSesion = () => {
    localStorage.removeItem("usuario");
    onClose();
    window.location.reload();
  };

  return (
    <div className="modalUsuario">
      <button onClick={onClose} className="btn_Cerrar">✕</button>

      <h2 className='tituloSesionActiva'>Sesión activa</h2>
      <p><strong>Usuario:</strong> {usuario.nombreUsuario}</p>
      <p><strong>Rol:</strong> {usuario.rol}</p>

      <button className='btnCerrarSesion' onClick={() => setMostrarConfirmacion(true)}> Cerrar sesión </button>
      {mostrarConfirmacion && (
        <div className="modalConfirmacion">
          <div className="contenidoConfirmacion">
            <p>¿Estás seguro que deseas cerrar la sesión?</p>
            <div className="botonesConfirmacion">
              <button className="btnConfirmar" onClick={handleCerrarSesion}> Aceptar </button>
              <button className="btn-Cancelar" onClick={() => setMostrarConfirmacion(false)}> Cancelar </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalUsuario;