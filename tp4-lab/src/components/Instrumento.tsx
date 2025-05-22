import React, { useState } from 'react';
import { InstrumentoType } from '../Entidades/types';
import '../styles/Instrumento.css';
import { Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { Rol } from '../Entidades/Rol';
import DetalleInstrumento from './DetalleInstrumento';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '../styles/modal.css'

const MySwal = withReactContent(Swal)

interface Props {
  instrumento: InstrumentoType;
}

const getImage = (imageName: string) => {
  return new URL(`../assets/img/${imageName}`, import.meta.url).href;
};

const Instrumento: React.FC<Props> = ({ instrumento }) => {
  const { agregarAlCarrito } = useCarrito();
  const [modalVerDetalle, setModalVerDetalle] = useState(false);

  const usuarioStr = localStorage.getItem('usuario');
  const usuarioLogueado = usuarioStr ? JSON.parse(usuarioStr) : null;
  const esAdmin = usuarioLogueado && usuarioLogueado.rol === Rol.ADMIN;

  return (
    <div className="instrumento-container">
      <img
        className="instrumento-img"
        src={
          instrumento.imagen.trim().toLowerCase().startsWith('http')
            ? instrumento.imagen.trim()
            : getImage(instrumento.imagen.trim())
        }
        alt={instrumento.instrumento}
      />

      <div className="instrumento-info">
        <h2 className="instrumento-titulo">{instrumento.instrumento}</h2>
        <p className="instrumento-precio">${instrumento.precio}</p>

        {instrumento.costoEnvio === 'G' ? (
          <p className="instrumento-envio-gratis">Envío gratis a todo el país</p>
        ) : (
          <p className="instrumento-envio">Costo de Envío Interior de Argentina: ${instrumento.costoEnvio}</p>
        )}

        <p className="instrumento-vendidos">{instrumento.cantidadVendida} vendidos</p>
        <div className="botones">
          {/* <Link to={`/detalle/${instrumento.id}`}> */}
          <button className="btn-ver-detalle" onClick={() => setModalVerDetalle(true)}>Ver Detalle</button>
          {/* </Link> */}
          <button
            className="btn-ver-detalle"
            onClick={() => {
              if (!usuarioLogueado) {
                Swal.fire({
                  position: "bottom-end",
                  icon: "warning",
                  title: "Debes iniciar sesión para agregar productos al carrito",
                  showConfirmButton: false,
                  timer: 1000,
                  width: "20em"
                });
              } else if (esAdmin) {
                Swal.fire({
                  position: "bottom-end",
                  icon: "warning",
                  title: "Debes ser cliente para agregar productos al carrito",
                  showConfirmButton: false,
                  timer: 1000,
                  width: "20em"
                });
              } else {
                agregarAlCarrito(instrumento);
                Swal.fire({
                  position: "bottom-end",
                  icon: "success",
                  title: "Instrumento agregado al carrito",
                  showConfirmButton: false,
                  timer: 1000,
                  width: "20em"
                });
              }
            }}
          > Agregar al carrito
          </button>
        </div>
      </div>

      {modalVerDetalle && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <DetalleInstrumento id={instrumento.id} onClose={() => setModalVerDetalle(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Instrumento;