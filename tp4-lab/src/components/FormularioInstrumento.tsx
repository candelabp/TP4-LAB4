import React, { useState } from 'react';
import { InstrumentoType, CategoriaType } from '../Entidades/types';
import '../styles/FormularioInstrumentos.css';

interface Props {
  categorias: CategoriaType[];
  onSubmit: (instrumento: InstrumentoType) => void;
  onClose: () => void;
  instrumento?: InstrumentoType;
}

const FormularioInstrumento: React.FC<Props> = ({ categorias, onSubmit, onClose, instrumento }) => {
  const [form, setForm] = useState<InstrumentoType>(instrumento || {
    id: '',
    instrumento: '',
    marca: '',
    modelo: '',
    descripcion: '',
    imagen: '',
    precio: 0,
    costoEnvio: '',
    cantidadVendida: 0,
    activo: true,
    categoria: undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      setForm({
        ...form,
        [name]: e.target.checked,
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  return (
    <form className="formulario-instrumento-modal" onSubmit={e => { e.preventDefault(); onSubmit(form); }}>
      <h2>Agregar Instrumento</h2>
      <div className="form-group">
        <label>Nombre</label>
        <input name="instrumento" value={form.instrumento} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Marca</label>
        <input name="marca" value={form.marca} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Modelo</label>
        <input name="modelo" value={form.modelo} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Precio</label>
        <input name="precio" type="number" value={form.precio} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Categoría</label>
        <select
          name="categoria"
          value={form.categoria?.id || ''}
          onChange={e => {
            const cat = categorias.find(c => String(c.id) === e.target.value);
            setForm({ ...form, categoria: cat });
          }}
          required
        >
          <option value="">Seleccione categoría</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Descripción</label>
        <input name="descripcion" value={form.descripcion} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Imagen (URL)</label>
        <input
          name="imagen"
          value={form.imagen}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Costo Envío</label>
        <input name="costoEnvio" value={form.costoEnvio} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Cantidad Vendida</label>
        <input name="cantidadVendida" type="number" value={form.cantidadVendida} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="activo"
            checked={form.activo}
            onChange={handleChange}
          />
          Activo
        </label>
        </div>
      <div className="form-buttons">
        <button type="submit" className="btn-guardar">Guardar</button>
        <button type="button" className="btn-cancelar" onClick={onClose}>Cancelar</button>
      </div>
    </form>
  );
};

export default FormularioInstrumento;