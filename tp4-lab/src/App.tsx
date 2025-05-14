import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CarritoProvider } from './context/CarritoContext';
import DetalleInstrumento from './components/DetalleInstrumento';
import ListadoInstrumentos from './pages/ListadoInstrumentos';
import Home from './pages/Home';
import TablaInstrumentos from './pages/TablaInstrumentos';
import ListadoPedidos from './pages/ListadoPedidos';
import DetallePedido from './pages/DetallePedido';
import RolUsuario from './components/ControlAcceso/RolUsuario';
import { Rol } from './Entidades/Rol';
import { RutaPrivada } from './components/ControlAcceso/RutaPrivada';

const App: React.FC = () => {
  return (
    <CarritoProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/instrumentos" element={<ListadoInstrumentos />} /> 

          {/* Rutas privadas */}
          <Route path="/pedidos" element={<RutaPrivada><ListadoPedidos /></RutaPrivada>} />
          <Route path="/pedidos/:id" element={<RutaPrivada><DetallePedido /></RutaPrivada>} />
        
          {/*ruta privada y con Rol Administrador*/}
          <Route element={<RolUsuario rol={Rol.ADMIN}/>}>
            <Route path="/tabla" element={<TablaInstrumentos />} />
            <Route path="/detalle/:id" element={<DetalleInstrumento />} />
          </Route> 
        </Routes>
      </Router>
    </CarritoProvider>
  );
};

export default App;