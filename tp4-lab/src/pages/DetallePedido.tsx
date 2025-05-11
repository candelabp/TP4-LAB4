import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ListadoInstrumentos.css';

const DetallePedido: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pedido, setPedido] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/pedidos/${id}`);
        setPedido(response.data);
      } catch (err) {
        setError('Error al cargar el pedido');
      } finally {
        setLoading(false);
      }
    };

    fetchPedido();
  }, [id]);

  if (loading) return <p>Cargando pedido...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="detalle-container">
      <h1>Detalles del Pedido</h1>
      <div className="detalle-info">
        <p><strong>Fecha:</strong> {new Date(pedido.fechaPedido).toLocaleString()}</p>
        <p><strong>Total:</strong> ${pedido.totalPedido ? pedido.totalPedido.toFixed(2) : '0.00'}</p>
        <h2>Detalles de los Productos</h2>
        {pedido.detallePedidos.length > 0 ? (
          <ul>
            {pedido.detallePedidos.map((detalle: any, index: number) => (
              <li key={index} className="instrumento-container">
                <div className="instrumento-info">
                  <p><strong>Instrumento:</strong> {detalle.instrumento.instrumento}</p>
                  <p><strong>Marca:</strong> {detalle.instrumento.marca}</p>
                  <p><strong>Modelo:</strong> {detalle.instrumento.modelo}</p>
                  <p><strong>Cantidad:</strong> {detalle.cantidad}</p>
                  <p><strong>Subtotal:</strong> ${detalle.subTotal.toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay detalles para este pedido.</p>
        )}
        <button className="btn-volver" onClick={() => navigate('/pedidos')}>
          Volver al Listado
        </button>
      </div>
    </div>
  );
};

export default DetallePedido;