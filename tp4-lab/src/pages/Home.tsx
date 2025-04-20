import Navbar from "../components/Navbar";
import "../styles/Home.css"; // Asegurate de tener este CSS
import Instrumento from "../assets/img/instrumento.jpg";
import Instrumento2 from "../assets/img/instrumento2.jpg";
import Instrumento3 from "../assets/img/donde-comprar-instrumentos-musicales-en-zona-oeste.jpg";
import { DondeEstamos } from "../components/DondeEstamos";
import ListadoInstrumentos from "./ListadoInstrumentos";
const Home = () => {
  return (
    <>
    <div className="home" id="inicio">
      <Navbar />
      <div className="slider-container">
        <div className="slider">
          <div className="slide fade">
            <img src={Instrumento} alt="Mandolina" />
          </div>
          <div className="slide fade">
            <img src={Instrumento2} alt="Pandereta" />
          </div>
          <div className="slide fade">
            <img src={Instrumento3} alt="Triángulo" />
          </div>
        </div>
      </div>

      <div className="descripcion-tienda">
        <h1>Bienvenido a Musical Hendrix</h1>
        <p>
          <strong>Musical Hendrix</strong> es una tienda de instrumentos musicales con ya más de
          15 años de experiencia. Tenemos el conocimiento y la capacidad como para informarte
          acerca de las mejores elecciones para tu compra musical.
        </p>
      </div>
    </div>
    <div className="donde-estamos" id="donde-estamos">
        <h2 className="titulo-hm">¿Dónde estamos?</h2>
        <h2 className="titulo-hm">Encontranos en:</h2>
        <DondeEstamos />

    </div>
    <div className="Productos"  id="productos">
        <h2 className="titulo-hm">Productos</h2>
        <ListadoInstrumentos />

    </div>

    </>
  );
};

export default Home;
