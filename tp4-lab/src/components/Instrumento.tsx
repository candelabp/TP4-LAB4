import React from 'react';
import { InstrumentoType } from './types';
import '../instrumento.css';
import { Link } from 'react-router-dom';
interface Props {
  instrumento: InstrumentoType;
}

const getImage = (imageName: string) => {
  return new URL(`../assets/img/${imageName}`, import.meta.url).href;
};

const Instrumento: React.FC<Props> = ({ instrumento }) => {
  return (
    
   
    <div className="instrumento-container">
      <img className="instrumento-img" src={getImage(instrumento.imagen)} alt={instrumento.instrumento} />

      <div className="instrumento-info">
        <h2 className="instrumento-titulo">{instrumento.instrumento}</h2>
        <p className="instrumento-precio">${instrumento.precio}</p>

        {/* Costo de envío */}
        {instrumento.costoEnvio === 'G' ? (
          <p className="instrumento-envio-gratis">Envío gratis a todo el país</p>
        ) : (
          <p className="instrumento-envio">Costo de Envío Interior de Argentina: ${instrumento.costoEnvio}</p>
        )}

        <p className="instrumento-vendidos">{instrumento.cantidadVendida} vendidos</p>
        <Link to={`/detalle/${instrumento.id}`}>
        <button className='btn-ver-detalle'>Ver Detalle</button>
      </Link>
      </div>
    </div>
  
  );
};

export default Instrumento;

  
