// src/pages/ListaInstrumentos.tsx
import { useEffect, useState } from 'react';
import { InstrumentoType } from '../components/types';
import Instrumento from '../components/Instrumento';
import '../instrumento.css';
const ListadoInstrumentos = () => {
  const [instrumentos, setInstrumentos] = useState<InstrumentoType[]>([]);

  useEffect(() => {
    fetch('/instrumentos.json')
      .then(res => res.json())
      .then(data => setInstrumentos(data.instrumentos));
  }, []);

  return (
    <>
    <div className="lista-instrumentos">
      {instrumentos.map((inst) => (
        <Instrumento key={inst.id} instrumento={inst} />
      ))}
    </div>
    </>
  );
};

export default ListadoInstrumentos;
