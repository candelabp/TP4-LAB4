import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Instrumento from './components/Instrumento';
import DetalleInstrumento from './components/DetalleInstrumento';
import ListadoInstrumentos from './pages/ListadoInstrumentos';
import Home from './pages/Home';
import TablaInstrumentos from './pages/TablaInstrumentos';
// import CompTablaInst from './components/CompTablaInst';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detalle/:id" element={<DetalleInstrumento />} />
        <Route path="/instrumentos" element={<ListadoInstrumentos />} />
        <Route path="/tabla" element={<TablaInstrumentos />} />
        {/* <Route path="/CompTablaInst" element={<CompTablaInst/>} /> */}
      </Routes>
    </Router>
  );
};

export default App;