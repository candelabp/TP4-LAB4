import '../navbar.css';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#inicio" className="navbar-logo">Musical Hendrix</a>
        <ul className="navbar-menu">
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#productos">Productos</a></li>
          <li><a href="#donde-estamos">Dónde estamos</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
