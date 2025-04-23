import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { InstrumentoType } from './types';
import { fetchInstrumentos } from '../utils/fetchInstrumentos';
import '../instrumento.css';

const getImage = (imageName: string) => {
  return new URL(`../assets/img/${imageName}`, import.meta.url).href;
};

const DetalleInstrumento = () => {
  const { id } = useParams();
  const [instrumento, setInstrumento] = useState<InstrumentoType | null>(null);

  useEffect(() => {
    fetchInstrumentos()
      .then(data => {
        const encontrado = data.find((i: InstrumentoType) => String(i.id) === String(id));
        setInstrumento(encontrado || null);
      })
      .catch(() => setInstrumento(null));
  }, [id]);

  if (!instrumento) return <p>Cargando...</p>;

  return (
    <div className="detalle-container">
      <img className="detalle-img" src={getImage(instrumento.imagen)} alt={instrumento.instrumento} />
      <div className="detalle-info">
        <p className="vendidos">{instrumento.cantidadVendida} vendidos</p>
        <h2>{instrumento.instrumento}</h2>
        <p className="precio">${instrumento.precio}</p>
        <p className="marca-modelo">Marca: {instrumento.marca}<br />Modelo: {instrumento.modelo}</p>
        <p><strong>Costo Envío:</strong></p>
        {instrumento.costoEnvio === 'G' ? (
          <p className="envio">📦 Envío gratis</p>
        ) : (
          <p>${instrumento.costoEnvio}</p>
        )}
        <button className="boton-agregar">Agregar al carrito</button>
        <div className="descripcion">
          <p><strong>Descripción:</strong></p>
          <p>{instrumento.descripcion}</p>
        </div>
        <Link to="/home" className="boton-volver">Volver al Home</Link>
      </div>
    </div>
  );
};

export default DetalleInstrumento;