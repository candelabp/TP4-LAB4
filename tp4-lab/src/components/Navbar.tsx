import '../styles/navbar.css';
import { useNavigate } from 'react-router-dom';
import carritoIcono from '../assets/icons/carrito.png';
import { useState, useEffect } from 'react';
import Carrito from './Carrito';
import loginIcono from '../assets/icons/login.png';
import ModalRegistro from './ModalRegistro';
import ModalLogin from './ModalLogin';
import { Usuario } from '../Entidades/Usuario';
import ModalUsuario from './ModalUsuario';
import { Rol } from '../Entidades/Rol';
import { Link as ScrollLink } from 'react-scroll';

export const Navbar = () => {
  const [carritoVisible, setCarritoVisible] = useState(false);
  const [modalRegistroVisible, setModalRegistroVisible] = useState(false);
  const [modalLoginVisible, setModalLoginVisible] = useState(false);
  const [modalUsuarioVisible, setModalUsuarioVisible] = useState(false);
  const [usuarioLogueado, setUsuarioLogueado] = useState<Usuario | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const usuarioStr = localStorage.getItem("usuario");
    if (usuarioStr) {
      setUsuarioLogueado(JSON.parse(usuarioStr));
    } else {
      setUsuarioLogueado(null);
    }

    const handleStorage = () => {
      const usuarioStr = localStorage.getItem("usuario");
      if (usuarioStr) {
        setUsuarioLogueado(JSON.parse(usuarioStr));
      } else {
        setUsuarioLogueado(null);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
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
            <li><ScrollLink smooth={true} duration={100} to="donde-estamos"><span className="navbar-link-btn">Donde estamos</span></ScrollLink></li>
            <li><ScrollLink smooth={true} duration={100} to="productos"><span className="navbar-link-btn">Productos</span></ScrollLink></li>
            <li><button className="navbar-link-btn" onClick={() => navigate('/tabla')}>Admin</button></li>
            <li><button className="navbar-link-btn" onClick={() => navigate('/pedidos')}>Pedidos</button></li>
            <li><button className="navbar-link-btn" onClick={() => {
              if (!usuarioLogueado) {
                alert("Debes iniciar sesión para ver el carrito.");
                setModalLoginVisible(true);
              } else if (usuarioLogueado.rol === Rol.ADMIN) {
                alert("Solo los clientes pueden acceder al carrito.");
              } else {
                setCarritoVisible(true);
              }
            }}>
              <img className="iconosNav" src={carritoIcono} alt="Carrito" />
            </button>
            </li>
            <li> <button className="navbar-link-btn" onClick={() => {
              if (usuarioLogueado) {
                setModalUsuarioVisible(true);
              } else {
                setModalRegistroVisible(true);
              }
            }}>
              <div>
                <img className={`iconosNav ${usuarioLogueado ? 'iconoLogueado' : ''}`} src={loginIcono} alt="login" />
                {usuarioLogueado && (
                  <span className='rolUsuario'>{usuarioLogueado.rol}</span>
                )}
              </div>
            </button>
            </li>
          </ul>
        </div>
      </nav >

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