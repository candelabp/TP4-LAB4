import '../navbar.css';
import { useNavigate } from 'react-router-dom';
import carritoIcono from '../assets/icons/image.png';
import { useState } from 'react';
import Carrito from './Carrito';

export const Navbar = () => {
  const [carritoVisible, setCarritoVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <span className="navbar-logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/home')}>
            Musical Hendrix
          </span>
          <ul className="navbar-menu">
            <li><button className="navbar-link-btn" onClick={() => navigate('/home')}>Inicio</button></li>
            <li><button className="navbar-link-btn" onClick={() => navigate('/home#productos')}>Productos</button></li>
            <li><button className="navbar-link-btn" onClick={() => navigate('/home#donde-estamos')}>Dónde estamos</button></li>
            <li><button className="navbar-link-btn" onClick={() => navigate('/tabla')}>Admin</button></li>
            <li>
              <button className="navbar-link-btn" onClick={() => navigate('/pedidos')}>
                Pedidos
              </button>
            </li>
            <li>
              <button className="navbar-link-btn" onClick={() => setCarritoVisible(true)}>
                <img className="carritoIcono" src={carritoIcono} alt="Carrito" />
              </button>
            </li>
          </ul>
        </div>
      </nav>
      {carritoVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <Carrito onClose={() => setCarritoVisible(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;