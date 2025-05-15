import '../navbar.css';
import { useNavigate } from 'react-router-dom';
import carritoIcono from '../assets/icons/carrito.png';
import { useState, useEffect } from 'react';
import Carrito from './Carrito';
import loginIcono from '../assets/icons/login.png';
import ModalRegistro from './ModalRegistro';
import ModalLogin from './ModalLogin';
import Usuario from '../Entidades/Usuario';
import ModalUsuario from './ModalUsuario';

export const Navbar = () => {
  const [carritoVisible, setCarritoVisible] = useState(false);
  const [modalRegistroVisible, setModalRegistroVisible] = useState(false);
  const [modalLoginVisible, setModalLoginVisible] = useState(false);
  const [modalUsuarioVisible, setModalUsuarioVisible] = useState(false);
  const [usuarioLogueado, setUsuarioLogueado] = useState<Usuario | null>(null); //

  const navigate = useNavigate();

  useEffect(() => {
    const usuarioStr = localStorage.getItem("usuario");
    if (usuarioStr) {
      setUsuarioLogueado(JSON.parse(usuarioStr));
    }
  }, []);

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
                <img className="iconosNav" src={carritoIcono} alt="Carrito" />
              </button>
            </li>
            <li>
              <button className="navbar-link-btn" data-bs-toggle="modal" data-bs-target="#modalRegistro" onClick={() => setModalRegistroVisible(true)}>
                <img className='iconosNav' src={loginIcono} alt="login" />
              </button>
            </li>
            <li>
              <button className="navbar-link-btn" onClick={() => {
                if (usuarioLogueado) {
                  setModalUsuarioVisible(true);
                } else {
                  setModalRegistroVisible(true);
                }
              }}>
                <img className='iconosNav' src={loginIcono} alt="login" />
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
      {modalRegistroVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ModalRegistro
              onClose={() => setModalRegistroVisible(false)}
              onOpenLogin={() => {
                setModalRegistroVisible(false);
                setModalLoginVisible(true);
              }}
            />
          </div>
        </div>
      )}
      {modalLoginVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ModalLogin
              onClose={() => setModalLoginVisible(false)}
              onOpenRegistro={() => {
                setModalLoginVisible(false);
                setModalRegistroVisible(true);
              }}
            />
          </div>
        </div>
      )}
      {modalUsuarioVisible && usuarioLogueado && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ModalUsuario
              usuario={usuarioLogueado}
              onClose={() => setModalUsuarioVisible(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;