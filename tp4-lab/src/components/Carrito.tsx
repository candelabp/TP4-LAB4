import { useNavigate } from 'react-router-dom';
import '../styles/carrito.css';
import { useCarrito } from '../context/CarritoContext';
import  Pedido  from '../Entidades/Pedido';
import  PedidoDetalle  from '../Entidades/PedidoDetalle';

type Props = {
  onClose: () => void;
};

const Carrito: React.FC<Props> = ({ onClose }) => {
  const { carrito, eliminarDelCarrito, vaciarCarrito, setCarrito } = useCarrito();
  const navigate = useNavigate();

  const handleIncrementar = (id: string | number) => {
    setCarrito(prev =>
      prev.map(item =>
        Number(item.instrumento.id) === Number(id)
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  };
  
  const handleDecrementar = (id: string | number) => {
    setCarrito(prev =>
      prev.map(item =>
        Number(item.instrumento.id) === Number(id) && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
    );
  };

  const handleCancelarPedido = () => {
    const confirmacion = window.confirm('¿Deseas cancelar el pedido?');
    if (confirmacion) {
      vaciarCarrito();
      navigate('/');
      onClose();
    }
  };

const handleConfirmarPedido = async () => {
  try {
    const pedido = new Pedido();
    pedido.totalPedido = Total;

    pedido.detallePedidos = carrito.map(item => {
      const detalle = new PedidoDetalle();
      detalle.cantidad = item.cantidad;
      detalle.instrumentoId = item.instrumento.id;
      return detalle;
    });

    const response = await fetch('http://localhost:8080/api/pedidos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido),
    });

    if (!response.ok) throw new Error("Error al guardar el pedido");

    alert(`El pedido se guardó correctamente`);
    vaciarCarrito();
    onClose();
  } catch (error) {
    alert('Error al realizar el pedido');
    console.error(error);
  }
};

  const Total = carrito.reduce(
    (subtotal, item) => subtotal + item.instrumento.precio * item.cantidad,
    0
  );

  return (
    <div>
      <button onClick={onClose} className="boton-cerrar">✕</button>
      <h2 className="titulo-pedido">MI ORDEN</h2>

      <div className="contenedor-items">
        {carrito.length === 0 ? (
          <p className="mensaje-carga">El carrito está vacío.</p>
        ) : (
          carrito.map(item => (
            <div key={item.instrumento.id} className="item-pedido">
              <div className="detalles-item">
                <p className="nombre-item">Instrumento: {item.instrumento.instrumento}</p>
                <p className="precio-item">Precio: ${item.instrumento.precio}</p>
                <p className="subtotal-item">Subtotal: ${item.instrumento.precio * item.cantidad}</p>
              </div>
              <div className="controles-item">
                <button onClick={() => handleDecrementar(item.instrumento.id)}>-</button>
                <span className="cantidad-item">{item.cantidad}</span>
                <button onClick={() => handleIncrementar(item.instrumento.id)}>+</button>
              </div>
              <div>
                <button onClick={() => eliminarDelCarrito(Number(item.instrumento.id))} className="boton-eliminar" > Eliminar </button>
              </div>
                
              
            </div>
          ))
        )}
      </div>

      <div className="resumen-pedido">
        <div className="fila-subtotal">
          <p className="texto-subtotal">Total:</p>
          <p className="valor-subtotal">${Total}</p>
        </div>

        <button onClick={handleConfirmarPedido} className="boton-confirmar"  disabled={carrito.length === 0}>
          Realizar pedido
        </button>
        <button onClick={handleCancelarPedido} className="boton-cancelar" disabled={carrito.length === 0}>
          Cancelar pedido
        </button>
      </div>
    </div>
  );
};

export default Carrito;