import React, { useState } from 'react';
import "../styles/ReporteExcel.css";

const ReporteExcel = () => {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const descargarExcel = async () => {
    const response = await fetch(`http://localhost:8080/api/pedidos/reportes?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'reporte.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      alert('Error al descargar el archivo');
    }
  };

  return (
    <form className='formulario__excel'
      onSubmit={(e) => {
        e.preventDefault();
        descargarExcel();
      }}
    >
      <input
        type="date"
        value={fechaInicio}
        onChange={(e) => setFechaInicio(e.target.value)}
        required
      />
      <input
        type="date"
        value={fechaFin}
        onChange={(e) => setFechaFin(e.target.value)}
        required
      />
      <button type="submit">Descargar Excel</button>
    </form>
  );
};

export default ReporteExcel;
