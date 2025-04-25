import { useEffect, useState } from 'react';
import { InstrumentoType } from '../components/types';
import Instrumento from '../components/Instrumento';
import '../instrumento.css';
import { fetchInstrumentos } from '../utils/fetchInstrumentos';

const ListadoInstrumentos = () => {
  const [instrumentos, setInstrumentos] = useState<InstrumentoType[]>([]);

  useEffect(() => {
    fetchInstrumentos()
      .then(data => setInstrumentos(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <div className="lista-instrumentos">
        {instrumentos
          .filter(inst => inst.activo) // Solo instrumentos activos
          .map((inst) => (
            <Instrumento key={inst.id} instrumento={inst} />
        ))}
      </div>
    </>
  );
};

export default ListadoInstrumentos;