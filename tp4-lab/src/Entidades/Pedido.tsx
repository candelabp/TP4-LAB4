import PedidoDetalle from './PedidoDetalle';

export default class Pedido {
  id?: number = 0;
  fechaPedido?: Date = new Date();
  totalPedido: number = 0;
  detallePedidos: PedidoDetalle[] = [];
}
