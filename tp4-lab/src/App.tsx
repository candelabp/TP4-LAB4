import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CarritoProvider } from './context/CarritoContext';
import DetalleInstrumento from './components/DetalleInstrumento';
import ListadoInstrumentos from './pages/ListadoInstrumentos';
import Home from './pages/Home';
import TablaInstrumentos from './pages/TablaInstrumentos';
import ListadoPedidos from './pages/ListadoPedidos';
import DetallePedido from './pages/DetallePedido';
import PagoExitoso from './pages/Compraexitosa';
import PagoFallido from './pages/CompraFalla';
const App: React.FC = () => {
  return (
    <CarritoProvider>
      <Router>
        <Routes>
          <Route path="/pedidos" element={<ListadoPedidos />} />
          <Route path="/pedidos/:id" element={<DetallePedido />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detalle/:id" element={<DetalleInstrumento />} />
          <Route path="/instrumentos" element={<ListadoInstrumentos />} />
          <Route path="/tabla" element={<TablaInstrumentos />} />
          <Route path="/compraexitosa" element={<PagoExitoso />} />
          <Route path="/comprafallida" element={<PagoFallido />} />
        </Routes>
      </Router>
    </CarritoProvider>
  );
};

export default App;