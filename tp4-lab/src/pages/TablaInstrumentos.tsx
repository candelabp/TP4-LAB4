import React from 'react';
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
                        <tr key={instrumento.id}>
                            <td>
                                <img
                                    className="img"
                                    src={new URL(`../assets/img/${instrumento.imagen}`, import.meta.url).href}
                                    alt={instrumento.instrumento}
                                />
                            </td>
                            <td>{instrumento.instrumento}</td>
                            <td>{instrumento.marca}</td>
                            <td>{instrumento.modelo}</td>
                            <td>${instrumento.precio}</td>
                            <td>{instrumento.activo ? "Sí" : "No"}</td>
                            <td>{instrumento.categoria?.nombre || "Sin categoría"}</td>
                            <td>
                                <button className="icon">Ver</button>
                            </td>
                            <td>
                                <button className="icon">Editar</button>
                            </td>
                            <td>
                                <button className="icon">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TablaInstrumentos;
