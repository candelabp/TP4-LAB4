import { useEffect, useState } from 'react';
import axios from 'axios';

export interface InstrumentoDTO {
  id: number;
  instrumento: string;
  marca: string;
  modelo: string;
  descripcion: string;
  imagen: string;
  precio: number;
  costoEnvio: string;
  cantidadVendida: number;
  activo: boolean;
  categoria: {
    id: number;
    nombre: string;
    activo: boolean;
  };
}

export interface DetallePedidoDTO {
  id: number;
  cantidad: number;
  subTotal: number;
  instrumento: InstrumentoDTO;
}

export interface PedidoDTO {
  id: number;
  fechaPedido: string;
  totalPedido: number | null; // Puede ser null
  detallePedidos: DetallePedidoDTO[];
}

const usePedidos = () => {
  const [pedidos, setPedidos] = useState<PedidoDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/pedidos');
        setPedidos(
          response.data.sort(
            (a: PedidoDTO, b: PedidoDTO) =>
              new Date(b.fechaPedido).getTime() - new Date(a.fechaPedido).getTime()
          )
        );
      } catch (err) {
        setError('Error al cargar los pedidos');
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  return { pedidos, loading, error };
};

export default usePedidos;