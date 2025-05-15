import React from 'react';
import Usuario from '../Entidades/Usuario';

type Props = {
  usuario: Usuario;
  onClose: () => void;
};

const ModalUsuario: React.FC<Props> = ({ usuario, onClose }) => {
  return (
    <div className="modalUsuario">
      <button onClick={onClose} className="btn_Cerrar">✕</button>

      <h2 className='tituloSesionActiva'>Sesión activa</h2>
      <p><strong>Usuario:</strong> {usuario.nombreUsuario}</p>
      <p><strong>Rol:</strong> {usuario.rol}</p>

      <button className='btnCerrarSesion' onClick={() => {
        localStorage.removeItem("usuario");
        onClose();
        window.location.reload();
      }}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default ModalUsuario;