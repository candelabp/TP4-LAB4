import { useState } from 'react';
import usePedidos, { PedidoDTO } from '../hooks/usePedidos';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/ListadoPedidos.css';
import DetallePedido from '../components/DetallePedido';
import '../styles/modal.css'

const ListadoPedidos: React.FC = () => {
  const { pedidos, loading, error } = usePedidos();
  const [orden, setOrden] = useState<'asc' | 'desc'>('desc');
  // const [modalDetallePedido, setModalDetallePedido] = useState<boolean>(false);
  const [detallePedidoId, setDetallePedidoId] = useState<string | number | null>(null);
  const navigate = useNavigate();

  // Ordenar por id
  const pedidosOrdenados = [...pedidos].sort((a, b) => {
    return orden === 'asc'
      ? Number(a.id) - Number(b.id)
      : Number(b.id) - Number(a.id);
  });

  return (
    <>
      <Navbar />
      <div className="lista-instrumentos">
        <div className="filtro-orden">
          <label>Ordenar por:</label>
          <select value={orden} onChange={(e) => setOrden(e.target.value as 'asc' | 'desc')}>
            <option value="desc">Mas reciente a mas antiguo</option>
            <option value="asc">Mas antiguo a mas reciente</option>
          </select>
        </div>

        {loading && <p>Cargando pedidos...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && pedidosOrdenados.length === 0 && <p>No hay pedidos disponibles.</p>}

        {!loading &&
          pedidosOrdenados.map((pedido: PedidoDTO) => (
            <div key={pedido.id} className="instrumento-container">
              <div className="instrumento-info">
                <p>
                  <strong>Fecha:</strong>{" "}
                  {new Date(pedido.fechaPedido).toLocaleDateString()}
                </p>
                <p>
                  <strong>Total:</strong> ${pedido.totalPedido ? pedido.totalPedido.toFixed(2) : '0.00'}
                </p>
                <button
                  className="btn-ver-detalles"
                  // onClick={() => setModalDetallePedido(true)}
                  onClick={() => setDetallePedidoId(pedido.id)}
                >
                  Ver Detalles
                </button>
              </div>
              {/* {modalDetallePedido && (
                    <div className='modal-overlay'>
                      <div className='modal-content'>
                        <DetallePedido id={pedido.id} onClose={() => setModalDetallePedido(false)} />
                      </div>
                    </div>
                  )} */}
              {detallePedidoId !== null && (
                <div className='modal-overlay'>
                  <div className='modal-content'>
                    <DetallePedido id={detallePedidoId} onClose={() => setDetallePedidoId(null)} />
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default ListadoPedidos;