import React from 'react';
import CompTablaInst from '../components/CompTablaInst';
import { InstrumentoType } from '../components/types';
import "../styles/TablaInstrumentos.css";

interface TablaInstrumentosProps {
    instrumentos: InstrumentoType[];
}

const TablaInstrumentos: React.FC<TablaInstrumentosProps> = ({ instrumentos }) => {
    return (
        <div className="tabla-instrumentos-container">
            <div className='div-titulo'>
                <h2 className='titulo'>Instrumentos</h2>
                <button className="btn-agregar">Agregar Instrumento</button>
            </div>
            <table className="tabla-instrumentos">
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Precio</th>
                        <th>Activo</th>
                        <th>Categoría</th>
                        <th>Ver</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {instrumentos.map((instrumento) => (
                        <CompTablaInst key={instrumento.id} instrumento={instrumento} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TablaInstrumentos;
