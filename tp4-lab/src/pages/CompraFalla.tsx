import React from 'react';
import Navbar from '../components/Navbar';
import "../styles/CompraExitosa.css"
const PagoFallido: React.FC = () => {
  return (
    <>
    <Navbar></Navbar>
    <div className="pago-container">
      <div className="pago-box">
        <svg
          className="error-icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
        <h1 className="pago-title">Pago fallido</h1>
        <p className="pago-text">
          Hubo un problema al procesar tu pago. Por favor, intentá nuevamente o contactá con soporte.
        </p>
      </div>
    </div>
    </>
  );
};

export default PagoFallido;
