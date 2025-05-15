import React, { useState } from 'react';
import { InstrumentoType } from '../Entidades/types';
import '../styles/Instrumento.css';
import { Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { Rol } from '../Entidades/Rol';
import DetalleInstrumento from './DetalleInstrumento';

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
                alert("Debes iniciar sesión para agregar productos al carrito.");
              } else if (esAdmin) {
                alert("Debes ser cliente para agregar productos al carrito.");
              } else {
                agregarAlCarrito(instrumento);
                alert("¡Producto agregado al carrito!");
              }
            }}
          > Agregar al carrito
          </button>
        </div>
      </div>

      {modalVerDetalle && (
        <div className='modalVerDetalle'>
          <div className='contenidoModal'>
            <DetalleInstrumento id={instrumento.id}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Instrumento;