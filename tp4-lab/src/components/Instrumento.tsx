import React, { useState } from 'react';
import { InstrumentoType } from './types';
import '../instrumento.css';
import { Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import Usuario from '../Entidades/Usuario';

interface Props {
  instrumento: InstrumentoType;
}

const getImage = (imageName: string) => {
  return new URL(`../assets/img/${imageName}`, import.meta.url).href;
};

const Instrumento: React.FC<Props> = ({ instrumento }) => {
  const { agregarAlCarrito } = useCarrito();
  const [usuarioLogueado, setUsuarioLogueado] = useState<Usuario | null>(null); 

  const handleStorage = () => {
    const usuarioStr = localStorage.getItem('usuario');
    if (usuarioStr) {
      setUsuarioLogueado(JSON.parse(usuarioStr));
    } else {
      setUsuarioLogueado(null);
    }
  };

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
          <Link to={`/detalle/${instrumento.id}`}>
            <button className="btn-ver-detalle">Ver Detalle</button>
          </Link>
          <button
            className="btn-ver-detalle"
            onClick={() => agregarAlCarrito(instrumento)}
            disabled={handleStorage() === null}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default Instrumento;