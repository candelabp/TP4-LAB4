import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InstrumentoType, CategoriaType } from '../Entidades/types';
import { fetchCategorias } from '../utils/fetchCategorias';
import { fetchInstrumentos } from '../utils/fetchInstrumentos';
import "../styles/TablaInstrumentos.css";
import FormularioInstrumento from '../components/FormularioInstrumento';
import { saveAs } from 'file-saver';
import Navbar from '../components/Navbar';
import DetalleInstrumento from '../components/DetalleInstrumento';
import '../styles/modal.css'
// import Navbar from '../components/Navbar';

const TablaInstrumentos: React.FC = () => {
    const [instrumentos, setInstrumentos] = useState<InstrumentoType[]>([]);
    const [categorias, setCategorias] = useState<CategoriaType[]>([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [instrumentoEditar, setInstrumentoEditar] = useState<InstrumentoType | null>(null);
    const [filtroActivo, setFiltroActivo] = useState<string>('todos');
    const [mostrarModalDetalleId, setMostrarModalDetalleId] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchInstrumentos().then(setInstrumentos);
        fetchCategorias().then(setCategorias);
    }, []);

    useEffect(() => {
        // Cuando cambia el filtroActivo, recarga los instrumentos
        fetchInstrumentos().then(setInstrumentos);
    }, [filtroActivo]);

    const instrumentosFiltrados = instrumentos.filter(i => {
        const categoriaOk = categoriaSeleccionada ? String(i.categoria?.id) === categoriaSeleccionada : true;
        const activoOk =
            filtroActivo === 'todos'
                ? true
                : filtroActivo === 'activos'
                    ? i.activo
                    : !i.activo;
        return categoriaOk && activoOk;
    });

    const handleEliminar = async (id: string) => {
        if (window.confirm('¿Seguro que deseas eliminar este instrumento?')) {
            await fetch(`http://localhost:8080/api/instrumentos/${id}`, { method: 'DELETE' });
            setInstrumentos(instrumentos.filter(i => i.id !== id));
        }
    };

    const handleEditar = (inst: InstrumentoType) => {
        setInstrumentoEditar(inst);
        setMostrarFormulario(true);
    };

    const handleSubmit = async (nuevo: InstrumentoType) => {
        if (instrumentoEditar) {
            await fetch(`http://localhost:8080/api/instrumentos/${instrumentoEditar.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevo),
            });
            setInstrumentoEditar(null);
        } else {
            await fetch('http://localhost:8080/api/instrumentos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevo),
            });
        }
        setMostrarFormulario(false);
        const nuevosInstrumentos = await fetchInstrumentos();
        setInstrumentos(nuevosInstrumentos);
    };

    const handleClose = () => {
        setMostrarFormulario(false);
        setInstrumentoEditar(null);
    };


    return (
        <>
            <Navbar />
            <div className="tabla-instrumentos-container">
                <div className='div-titulo'>
                    <h2 className='titulo'>Instrumentos</h2>
                    <button className="btn-agregar" onClick={() => { setInstrumentoEditar(null); setMostrarFormulario(true); }}>Agregar Instrumento</button>
                </div>
                <div className="filtro-categoria">
                    <label>Filtrar por categoría: </label>
                    <select
                        value={categoriaSeleccionada}
                        onChange={e => setCategoriaSeleccionada(e.target.value)}
                    >
                        <option value="">Todas</option>
                        {categorias.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                        ))}
                    </select>
                    <label style={{ marginLeft: 16 }}>Filtrar por estado: </label>
                    <select
                        value={filtroActivo}
                        onChange={e => setFiltroActivo(e.target.value)}
                        style={{ marginLeft: 4 }}
                    >
                        <option value="todos">Todos</option>
                        <option value="activos">Activos</option>
                        <option value="noactivos">No activos</option>
                    </select>
                </div>
                {mostrarFormulario && (
                    <div className="modal-overlay">
                        <div className="contenedorModal">
                            <button className="cerrar-modal" onClick={handleClose}>×</button>
                            <FormularioInstrumento
                                categorias={categorias}
                                instrumento={instrumentoEditar || undefined}
                                onClose={handleClose}
                                onSubmit={handleSubmit}
                            />
                        </div>
                    </div>
                )}
                <table className="tabla-instrumentos">
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Precio</th>
                            <th>Categoría</th>
                            <th>Ver</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                            <th>PDF</th>
                        </tr>
                    </thead>
                    <tbody>
                        {instrumentosFiltrados.map((instrumento) => (
                            <tr key={instrumento.id}>
                                <td>
                                    <img
                                        className="img"
                                        src={
                                            instrumento.imagen.trim().toLowerCase().startsWith('http')
                                                ? instrumento.imagen.trim()
                                                : new URL(`../assets/img/${instrumento.imagen.trim()}`, import.meta.url).href
                                        }
                                        alt={instrumento.instrumento}
                                    />
                                </td>
                                <td>{instrumento.instrumento}</td>
                                <td>{instrumento.marca}</td>
                                <td>{instrumento.modelo}</td>
                                <td>${instrumento.precio}</td>
                                <td>{instrumento.categoria?.nombre || "Sin categoría"}</td>
                                <td>
                                    <button className="icon" onClick={() => setMostrarModalDetalleId(instrumento.id)}>Ver</button>
                                    {mostrarModalDetalleId === instrumento.id && (
                                        <div className='modal-overlay'>
                                            <div className='modal-content'>
                                                <DetalleInstrumento id={instrumento.id} onClose={() => setMostrarModalDetalleId(null)} />
                                            </div>
                                        </div>
                                    )}
                                </td>
                                <td>
                                    <button className="icon" onClick={() => handleEditar(instrumento)}>Editar</button>
                                </td>
                                <td>
                                    {filtroActivo === "noactivos" ? (
                                        <button
                                            className="icon"
                                            onClick={async () => {
                                                // Cambiar el estado a activo
                                                await fetch(`http://localhost:8080/api/instrumentos/${instrumento.id}`, {
                                                    method: 'PUT',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ ...instrumento, activo: true }),
                                                });
                                                // Recargar instrumentos
                                                const nuevosInstrumentos = await fetchInstrumentos();
                                                setInstrumentos(nuevosInstrumentos);
                                            }}
                                        >
                                            Activar
                                        </button>
                                    ) : (
                                        <button className="icon" onClick={() => handleEliminar(instrumento.id)}>Eliminar</button>
                                    )}
                                </td>
                                <td>
                                    <button
                                        className="icon"
                                        onClick={async () => {
                                            const response = await fetch(`http://localhost:8080/api/instrumentos/${instrumento.id}/pdf`, {
                                                method: 'GET',
                                            });
                                            if (response.ok) {
                                                const blob = await response.blob();
                                                const url = window.URL.createObjectURL(blob);
                                                const a = document.createElement('a');
                                                a.href = url;
                                                a.download = `instrumento_${instrumento.id}.pdf`;
                                                document.body.appendChild(a);
                                                a.click();
                                                a.remove();
                                                window.URL.revokeObjectURL(url);
                                            }
                                            // Recargar instrumentos
                                            const nuevosInstrumentos = await fetchInstrumentos();
                                            setInstrumentos(nuevosInstrumentos);
                                        }}
                                    >
                                        Exportar PDF
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TablaInstrumentos;