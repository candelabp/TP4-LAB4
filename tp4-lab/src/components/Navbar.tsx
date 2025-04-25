import '../navbar.css';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();

  return (
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
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
