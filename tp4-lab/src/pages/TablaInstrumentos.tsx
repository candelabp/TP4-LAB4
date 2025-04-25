import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InstrumentoType, CategoriaType } from '../components/types';
import { fetchCategorias } from '../utils/fetchCategorias';
import { fetchInstrumentos } from '../utils/fetchInstrumentos';
import "../styles/TablaInstrumentos.css";
import FormularioInstrumento from '../components/FormularioInstrumento';

const TablaInstrumentos: React.FC = () => {
    const [instrumentos, setInstrumentos] = useState<InstrumentoType[]>([]);
    const [categorias, setCategorias] = useState<CategoriaType[]>([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [instrumentoEditar, setInstrumentoEditar] = useState<InstrumentoType | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchInstrumentos().then(setInstrumentos);
        fetchCategorias().then(setCategorias);
    }, []);

    const instrumentosFiltrados = categoriaSeleccionada
        ? instrumentos.filter(i => i.activo && String(i.categoria?.id) === categoriaSeleccionada)
        : instrumentos.filter(i => i.activo);

    const handleEliminar = async (id: string) => {
        if (window.confirm('¿Seguro que deseas eliminar este instrumento?')) {
            await fetch(`http://localhost:8080/api/instrumentos/${id}`, { method: 'DELETE' });
            setInstrumentos(instrumentos.filter(i => i.id !== id));
        }
    };

    // Editar instrumento
    const handleEditar = (inst: InstrumentoType) => {
        setInstrumentoEditar(inst);
        setMostrarFormulario(true);
    };

    const handleSubmit = async (nuevo: InstrumentoType) => {
        if (instrumentoEditar) {
            // PUT para editar
            await fetch(`http://localhost:8080/api/instrumentos/${instrumentoEditar.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevo),
            });
            setInstrumentoEditar(null);
        } else {
            // POST para agregar
            await fetch('http://localhost:8080/api/instrumentos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevo),
            });
        }
        setMostrarFormulario(false);
        // Recargar la lista desde el backend
        const nuevosInstrumentos = await fetchInstrumentos();
        setInstrumentos(nuevosInstrumentos);
    };

    // Cerrar modal
    const handleClose = () => {
        setMostrarFormulario(false);
        setInstrumentoEditar(null);
    };

    return (
        <div className="tabla-instrumentos-container">
            <button
                className="btn-agregar"
                style={{ marginBottom: 16 }}
                onClick={() => navigate('/home')}
            >
                Ir al Home
            </button>
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
                                <button className="icon" onClick={() => navigate(`/detalle/${instrumento.id}`, { state: { fromTabla: true } })}>Ver</button>
                            </td>
                            <td>
                                <button className="icon" onClick={() => handleEditar(instrumento)}>Editar</button>
                            </td>
                            <td>
                                <button className="icon" onClick={() => handleEliminar(instrumento.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TablaInstrumentos;