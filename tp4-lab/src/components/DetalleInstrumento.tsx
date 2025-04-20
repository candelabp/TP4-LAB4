import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { InstrumentoType } from './types';
import '../instrumento.css';
const getImage = (imageName: string) => {
  return new URL(`../assets/img/${imageName}`, import.meta.url).href;
};

const DetalleInstrumento = () => {
  const { id } = useParams();
  const [instrumento, setInstrumento] = useState<InstrumentoType | null>(null);

  useEffect(() => {
    fetch('/instrumentos.json')
      .then(res => res.json())
      .then(data => {
        const encontrado = data.instrumentos.find((i: InstrumentoType) => i.id === id);
        setInstrumento(encontrado);
      });
  }, [id]);

  if (!instrumento) return <p>Cargando...</p>;

  return (
    <>
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
  </div>
</div>
</>
  );
};

export default DetalleInstrumento;
