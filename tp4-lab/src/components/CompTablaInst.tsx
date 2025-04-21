import React, { useState } from "react";
import { InstrumentoType } from "./types";
import "../styles/TablaInstrumentos.css";
import Ver from "../assets/icons/ver.png";
import Editar from "../assets/icons/editar.png";
import Eliminar from "../assets/icons/eliminar.png";

const getImage = (imageName: string) => {
    return new URL(`../assets/img/${imageName}`, import.meta.url).href;
};

interface Props {
    instrumento: InstrumentoType;
}

const CompTablaInst: React.FC<Props> = ({ instrumento }) => {
    const [verDetalles, setVerDetalles] = useState(false);
    const [editarInstrumento, setEditarInstrumento] = useState(false);
    const [datosInstrumento, setDatosInstrumento] = useState(instrumento);

    const handleGuardar = () => {
        console.log("Instrumento actualizado:", datosInstrumento);
        setEditarInstrumento(false);
        // guardar en el backend
    };

    return (


        <tr>
            <td><img className="img" src={getImage(instrumento.imagen)} alt={instrumento.instrumento} /></td>
            <td className="nombre">{instrumento.instrumento}</td>
            <td>{instrumento.marca}</td>
            <td>{instrumento.modelo}</td>
            <td>${instrumento.precio}</td>
            <td>{instrumento.activo ? "Sí" : "No"}</td>
            <td> {instrumento.categoria?.nombre || "Sin categoría"}</td>
            <td><button className="icon"><img src={Ver} alt="Ver" className="icon" /></button></td>
            <td><button className="icon" onClick={() => setEditarInstrumento(true)}><img src={Editar} alt="Editar" className="icon" /></button></td>
            <td><button className="icon"><img src={Eliminar} alt="Eliminar" className="icon" /></button></td>

            <div>
                {verDetalles &&
                    <div className="modal">
                        <h2>Detalles Instrumento</h2>
                        <p>Nombre:</p>
                        <p>{instrumento.marca}</p>
                        <img className="img" src={getImage(instrumento.imagen)} alt={instrumento.instrumento} />
                        <p>Descripcion</p>
                        <p>{datosInstrumento.descripcion}</p>
                        <p>Costo envio:</p>
                        <p>{datosInstrumento.costoEnvio}</p>
                        <p>Cantidad Vendida:</p>
                        <p>{datosInstrumento.cantidadVendida}</p>
                    </div>
                }

                {editarInstrumento &&
                    <div className="modal">
                        <h2>Editar Instrumento</h2>
                        <label>Nombre:</label>
                        <input type="text" name="nombre" value={datosInstrumento.instrumento} />

                        <label>Imagen:</label>
                        <input type="text" name="imagen" value={datosInstrumento.imagen} />
                        <img src={datosInstrumento.imagen} alt="Imagen del instrumento" />

                        <label>Descripción:</label>
                        <input type="text" name="descripcion" value={datosInstrumento.descripcion} />

                        <label>Marca:</label>
                        <input type="text" name="marca" value={datosInstrumento.marca} />

                        <label>Modelo:</label>
                        <input type="text" name="modelo" value={datosInstrumento.modelo} />

                        <label>Precio:</label>
                        <input type="text" name="precio" value={datosInstrumento.precio} />

                        <label>Costo envío:</label>
                        <input type="text" name="costoEnvio" value={datosInstrumento.costoEnvio} />

                        <label>Cantidad Vendida:</label>
                        <input type="text" name="cantidadVendida" value={datosInstrumento.cantidadVendida} />

                        <label>Activo:</label>
                        <input type="text" name="activo" value={datosInstrumento.activo ? "true" : "false"} />

                        <button onClick={handleGuardar}>Guardar</button>
                    </div>}
            </div>
        </tr>

    );
};

export default CompTablaInst;