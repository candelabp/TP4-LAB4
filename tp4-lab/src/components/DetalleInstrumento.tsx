import { useParams, useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const navigate = useNavigate();
  const fromTabla = location.state?.fromTabla;

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
      <img
        className="instrumento-img"
        src={
          instrumento.imagen.trim().toLowerCase().startsWith('http')
            ? instrumento.imagen.trim()
            : getImage(instrumento.imagen.trim())
        }
        alt={instrumento.instrumento}
      />
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
        {!fromTabla && (
          <button className="boton-agregar">Agregar al carrito</button>
        )}
        <div className="descripcion">
          <p><strong>Descripción:</strong></p>
          <p>{instrumento.descripcion}</p>
        </div>
        {fromTabla ? (
          <button className="btn-agregar" onClick={() => navigate('/tabla')}>Volver a la tabla</button>
        ) : (
          <button className="btn-agregar" onClick={() => navigate('/home')}>Volver al home</button>
        )}
      </div>
    </div>
  );
};

export default DetalleInstrumento;