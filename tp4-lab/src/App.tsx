import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Instrumento from './components/Instrumento';
import DetalleInstrumento from './components/DetalleInstrumento';
import { InstrumentoType } from './components/types';
import ListadoInstrumentos from './pages/ListadoInstrumentos';
import Home from './pages/Home';
const App: React.FC = () => {
  const [instrumentos, setInstrumentos] = useState<InstrumentoType[]>([]);

  useEffect(() => {
    fetch('/instrumentos.json')
      .then(res => res.json())
      .then(data => setInstrumentos(data.instrumentos));
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              {instrumentos.map((instrumento) => (
                <Instrumento key={instrumento.id} instrumento={instrumento} />
              ))}
            </div>
          }
        />
        <Route path="/detalle/:id" element={<DetalleInstrumento />} />
        <Route path="/instrumentos" element={<ListadoInstrumentos />} />
        <Route path="/home" element={<Home />} />

      </Routes>
    </Router>
  );
};

export default App;
