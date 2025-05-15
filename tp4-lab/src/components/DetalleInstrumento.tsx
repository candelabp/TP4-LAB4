import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { InstrumentoType } from '../Entidades/types';
import { fetchInstrumentos } from '../utils/fetchInstrumentos';
import '../styles/instrumento.css';
import { useCarrito } from '../context/CarritoContext';
import { Rol } from '../Entidades/Rol';

const getImage = (imageName: string) => {
  return new URL(`../assets/img/${imageName}`, import.meta.url).href;
};

type Props = {
  id: number | string;
  onClose: () => void;
};

const DetalleInstrumento: React.FC<Props> = ({ id, onClose }) => {
  const [instrumento, setInstrumento] = useState<InstrumentoType | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const fromTabla = location.state?.fromTabla;
  const { agregarAlCarrito } = useCarrito();

  const usuarioStr = localStorage.getItem('usuario');
  const usuarioLogueado = usuarioStr ? JSON.parse(usuarioStr) : null;
  const esAdmin = usuarioLogueado && usuarioLogueado.rol === Rol.ADMIN;

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
    <div>
      <button onClick={onClose} className="botonX" type="button">✕</button>
      <div className="detalle-info">
        <p className="vendidos">{instrumento.cantidadVendida} vendidos</p>
        <h2>{instrumento.instrumento}</h2>
        <img
          className="instrumento-img"
          src={
            instrumento.imagen.trim().toLowerCase().startsWith('http')
              ? instrumento.imagen.trim()
              : getImage(instrumento.imagen.trim())
          }
          alt={instrumento.instrumento}
        />
        <p className="precio">${instrumento.precio}</p>
        <p className="marca-modelo">Marca: {instrumento.marca}<br />Modelo: {instrumento.modelo}</p>
        <p><strong>Costo Envío:</strong></p>
        {instrumento.costoEnvio === 'G' ? (
          <p className="envio">📦 Envío gratis</p>
        ) : (
          <p>${instrumento.costoEnvio}</p>
        )}
        {!fromTabla && (
          <button className="boton-agregar" onClick={() => {
            if (!usuarioLogueado) {
              alert("Debes iniciar sesión para agregar productos al carrito.");
            } else if (esAdmin) {
              alert("Debes ser cliente para agregar productos al carrito.");
            } else {
              agregarAlCarrito(instrumento);
              alert("¡Producto agregado al carrito!");
            }
          }}
          >Agregar al carrito</button>
        )}
        <div className="descripcion">
          <p><strong>Descripción:</strong></p>
          <p>{instrumento.descripcion}</p>
        </div>
        {/* {fromTabla ? (
          <button className="btn-agregar" onClick={() => navigate('/tabla')}>Volver a la tabla</button>
        ) : (
          <button className="btn-agregar" onClick={() => navigate('/home')}>Volver al home</button>
        )} */}
      </div>
    </div>
  );
};

export default DetalleInstrumento;