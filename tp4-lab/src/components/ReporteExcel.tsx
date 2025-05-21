import React, { useState } from 'react';

const ReporteExcel = () => {
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');

  const descargarExcel = async () => {
    const response = await fetch(`http://localhost:8080/api/reportes/descargar-excel?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`);

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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        descargarExcel();
      }}
    >
      <input
        type="date"
        value={fechaDesde}
        onChange={(e) => setFechaDesde(e.target.value)}
        required
      />
      <input
        type="date"
        value={fechaHasta}
        onChange={(e) => setFechaHasta(e.target.value)}
        required
      />
      <button type="submit">Descargar Excel</button>
    </form>
  );
};

export default ReporteExcel;
