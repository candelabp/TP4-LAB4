import React from 'react';
import "../styles/CompraExitosa.css"
import Navbar from '../components/Navbar';
const PagoExitoso: React.FC = () => {
  return (
    <>
    <Navbar></Navbar>
    <div className="pago-container">
      <div className="pago-box">
        <svg
          className="check-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
        <h1 className="pago-title">¡Pago exitoso!</h1>
        <p className="pago-text">
          Gracias por tu compra. Te enviaremos una confirmación a tu correo electrónico.
        </p>
      </div>
    </div>
    </>
  );
};

export default PagoExitoso;
