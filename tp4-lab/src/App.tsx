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
// import { RutaPrivada } from './components/ControlAcceso/RutaPrivada';

const App: React.FC = () => {
  return (
    <CarritoProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/instrumentos" element={<ListadoInstrumentos />} /> 
        
          {/*ruta privada y con Rol Administrador*/}
          <Route element={<RolUsuario rol={Rol.ADMIN}/>}>
            <Route path="/tabla" element={<TablaInstrumentos />} />
            <Route path="/pedidos" element={<ListadoPedidos />} />
            <Route path="/pedidos/:id" element={<DetallePedido />} />
          </Route> 
        </Routes>
      </Router>
    </CarritoProvider>
  );
};

export default App;