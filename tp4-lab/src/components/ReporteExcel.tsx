import React, { useState } from 'react';
import "../styles/ReporteExcel.css";
import Swal from 'sweetalert2'


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
      
      const data = await response.json();
      Swal.fire({
        position: "bottom-end",
        icon: "error",
        title: data.mensaje,
        showConfirmButton: false,
        timer: 2000,
        width: "22em"
      });
    }
  };

  return (
    <form className='formulario__excel'
      onSubmit={(e) => {
        e.preventDefault();
        descargarExcel();
      }}
    >
      <div className='container__containers'>
        <div className='container__fecha'>
          <label htmlFor="">Desde:</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            required
          />
        </div>
        <div className='container__fecha'>
          <label htmlFor="">Hasta:</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            required
          />
        </div>
      </div>
      <button type="submit">Descargar Excel</button>
    </form>
  );
};

export default ReporteExcel;
