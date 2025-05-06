import { use, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/carrito.css';

interface DetallePedido {
    id: number;
    cantidad: number;
    subTotal: number;
    productoId: number;
}

type Props = {
  onClose: () => void;
};

const Carrito: React.FC<Props> = ({ onClose }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [detallePedido, setDetallePedido] = useState<DetallePedido[]>([]);
  const navigate = useNavigate();

  /*useEffect(() => {
    const fetchDetallePedido = async () => {
      try {
        const response = await axios.get('');
        setDetallePedido(response.data);
      } catch (error) {
        setError('Error al cargar los detalles del pedido');
      } finally {
        setLoading(false);
      }
    }
    fetchDetallePedido();
  }
  , []);*/

  const precioUnitario = 100; // suponiendo precio fijo 100
  const incrementarCantidad = (id: number) => {
    setDetallePedido(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, cantidad: item.cantidad + 1, subTotal: (item.cantidad + 1) * precioUnitario }
          : item
      )
    );
  };

  const decrementarCantidad = (id: number) => {
    setDetallePedido(prev =>
      prev.map(item =>
        item.id === id && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1, subTotal: (item.cantidad - 1) * precioUnitario }
          : item
      )
    );
  };

  const eliminarItem = (id: number) => {
    setDetallePedido(prev => prev.filter(item => item.id !== id));
  };

  const handleCancelarPedido = () => {
    const confirmacion = window.confirm("¿Deseas cancelar el pedido?");
    if (confirmacion) {
      navigate('/');
      onClose();
    }
  }

  const Total = detallePedido.reduce((subtotal, item) => subtotal + item.subTotal, 0);

  return (
    <div>
      <button onClick={onClose} className="boton-cerrar">✕</button>
      <h2 className="titulo-pedido">MI ORDEN</h2>

      <div className="contenedor-items">
        {loading &&
          <p className="mensaje-carga">Cargando pedido...</p>
        }
        {error &&
          <p className="mensaje-error">{error}</p>
        }
        {!loading && detallePedido.map((item: DetallePedido) => (
          <div key={item.id} className="item-pedido">
            <img src="" alt="" className="imagen-item" />
            <div className="detalles-item">
              <p className="nombre-item">{item.productoId}</p>
              <p className="subtotal-item">Subtotal: ${item.subTotal}</p>
            </div>
            <div className="controles-item">
              <div className="controles-cantidad">
                <button onClick={() => decrementarCantidad(item.id)} className="boton-decrementar">–</button>
                <span className="cantidad-item">{item.cantidad}</span>
                <button onClick={() => incrementarCantidad(item.id)} className="boton-incrementar">+</button>
              </div>
              <button onClick={() => eliminarItem(item.id)}
                className="boton-eliminar">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="resumen-pedido">
        <div className="fila-subtotal">
          <p className="texto-subtotal">Total:</p>
          <p className="valor-subtotal">${Total}</p>
        </div>

        <button className="boton-confirmar">Realizar pedido</button>
        <button onClick={handleCancelarPedido} className="boton-cancelar">Cancelar pedido</button>
      </div>
    </div>
  );
}

export default Carrito;