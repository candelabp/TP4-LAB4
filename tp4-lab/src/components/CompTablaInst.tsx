// import React, { useEffect, useState } from "react";
// import { InstrumentoType } from "./types";
// import "../styles/TablaInstrumentos.css";
// import Ver from "../assets/icons/ver.png";
// import Editar from "../assets/icons/editar.png";
// import Eliminar from "../assets/icons/eliminar.png";

// const getImage = (imageName: string) => {
//     return new URL(`../assets/img/${imageName}`, import.meta.url).href;
// };

// const fetchInstrumentos = async (): Promise<InstrumentoType[]> => {
//     try {
//         const response = await fetch("http://localhost:8080/api/instrumentos");
//         if (!response.ok) {
//             throw new Error("Error al obtener los instrumentos");
//         }
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error(error);
//         return [];
//     }
// };

// const CompTablaInst: React.FC = () => {
//     const [instrumentos, setInstrumentos] = useState<InstrumentoType[]>([]);
//     const [modalAbierto, setModalAbierto] = useState(false);
//     const [nuevoProducto, setNuevoProducto] = useState<Omit<InstrumentoType, 'id'>>({
//         instrumento: '',
//         marca: '',
//         modelo: '',
//         precio: 0,
//         imagen: 'default.jpg',
//         activo: true,
//         // categoria: [{id.nombre, id.activo}],
//         descripcion: '',
//         costoEnvio: 0
//     });

//     useEffect(() => {
//         const obtenerInstrumentos = async () => {
//             const data = await fetchInstrumentos();
//             setInstrumentos(data);
//         };
//         obtenerInstrumentos();
//     }, []);

//     const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value, type, checked } = e.target;
//         setNuevoProducto({
//             ...nuevoProducto,
//             [name]: type === 'checkbox' ? checked : value
//         });
//     };

//     const agregarProducto = () => {
//         setModalAbierto(true);
//     };

//     const cerrarModal = () => {
//         setModalAbierto(false);
//     };

//     const enviarFormulario = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const response = await fetch("http://localhost:8080/api/instrumentos", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(nuevoProducto),
//             });

//             if (!response.ok) {
//                 throw new Error("Error al agregar el instrumento");
//             }

//             const data = await response.json();
//             setInstrumentos([...instrumentos, data]);
//             cerrarModal();
//             setNuevoProducto({
//                 instrumento: '',
//                 marca: '',
//                 modelo: '',
//                 precio: 0,
//                 imagen: 'default.jpg',
//                 activo: true,
//                 categoria: null,
//                 descripcion: ''
//             });
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <>
//             <table className="tabla-instrumentos">
//                 <thead>
//                     <tr>
//                         <th>Imagen</th>
//                         <th>Nombre</th>
//                         <th>Marca</th>
//                         <th>Modelo</th>
//                         <th>Precio</th>
//                         <th>Activo</th>
//                         <th>Categoría</th>
//                         <th>Acciones</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {instrumentos.map((instrumento) => (
//                         <tr key={instrumento.id}>
//                             <td><img className="img" src={getImage(instrumento.imagen)} alt={instrumento.instrumento} /></td>
//                             <td className="nombre">{instrumento.instrumento}</td>
//                             <td>{instrumento.marca}</td>
//                             <td>{instrumento.modelo}</td>
//                             <td>${instrumento.precio}</td>
//                             <td>{instrumento.activo ? "Sí" : "No"}</td>
//                             <td>{instrumento.categoria?.nombre || "Sin categoría"}</td>
//                             <td>
//                                 <button className="icon"><img src={Ver} alt="Ver" className="icon" /></button>
//                                 <button className="icon"><img src={Editar} alt="Editar" className="icon" /></button>
//                                 <button className="icon"><img src={Eliminar} alt="Eliminar" className="icon" /></button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <button className="buttonAgregarProducto" onClick={agregarProducto}>+</button>

//             {modalAbierto && (
//                 <div className="modal-overlay">
//                     <div className="contenedorModal">
//                         <div className="modal-header">
//                             <h2>Agregar Producto</h2>
//                             <button className="cerrar-modal" onClick={cerrarModal}>×</button>
//                         </div>
//                         <form className="modalAgregarProducto" onSubmit={enviarFormulario}>
//                             <div className="form-group">
//                                 <label htmlFor="instrumento">Nombre:</label>
//                                 <input 
//                                     type="text" 
//                                     id="instrumento" 
//                                     name="instrumento" 
//                                     value={nuevoProducto.instrumento}
//                                     onChange={manejarCambio}
//                                     required 
//                                 />
//                             </div>
                            
//                             <div className="form-group">
//                                 <label htmlFor="marca">Marca:</label>
//                                 <input 
//                                     type="text" 
//                                     id="marca" 
//                                     name="marca" 
//                                     value={nuevoProducto.marca}
//                                     onChange={manejarCambio}
//                                     required 
//                                 />
//                             </div>
                            
//                             <div className="form-group">
//                                 <label htmlFor="modelo">Modelo:</label>
//                                 <input 
//                                     type="text" 
//                                     id="modelo" 
//                                     name="modelo" 
//                                     value={nuevoProducto.modelo}
//                                     onChange={manejarCambio}
//                                     required 
//                                 />
//                             </div>
                            
//                             <div className="form-group">
//                                 <label htmlFor="precio">Precio:</label>
//                                 <input 
//                                     type="number" 
//                                     id="precio" 
//                                     name="precio" 
//                                     value={nuevoProducto.precio}
//                                     onChange={manejarCambio}
//                                     required 
//                                 />
//                             </div>


//                             <div className="form-group">
//                                 <label htmlFor="categoria">Categoria:</label>
//                                 <select className="selectFormModal" id="categoria" name="categoria" onChange={manejarCambio} required value={nuevoProducto.categoria}>
//                                     <option value="">NOSE1</option>
//                                     <option value="">NOSE2</option>
//                                 </select> 
//                             </div>


//                             <div className="form-group">
//                                 <label htmlFor="costoEnvio">Costo Envio:</label>
//                                 <input 
//                                     type="text" 
//                                     id="costoEnvio" 
//                                     name="costoEnvio" 
//                                     value={nuevoProducto.costoEnvio}
//                                     onChange={manejarCambio}
//                                     required 
//                                 />
//                             </div>


//                             <div className="form-group">
//                                 <label htmlFor="description">Descripcion:</label>
//                                 <input 
//                                     type="text" 
//                                     id="description" 
//                                     name="description" 
//                                     value={nuevoProducto.description}
//                                     onChange={manejarCambio}
//                                     required 
//                                 />
//                             </div>


//                             <div className="form-group">
//                                 <label htmlFor="cantVendida">Cantidad Vendida:</label>
//                                 <input 
//                                     type="number" 
//                                     id="cantVendida" 
//                                     name="cantVendida" 
//                                     value={nuevoProducto.cantVendida}
//                                     onChange={manejarCambio}
//                                     required 
//                                 />
//                             </div>
                            
                            
//                             <div className="form-group checkbox-group">
//                                 <label htmlFor="activo">Activo:</label>
//                                 <input 
//                                     type="checkbox" 
//                                     id="activo" 
//                                     name="activo" 
//                                     checked={nuevoProducto.activo}
//                                     onChange={manejarCambio}
//                                 />
//                             </div>
                            
//                             <div className="form-buttons">
//                                 <button type="button" className="btn-cancelar" onClick={cerrarModal}>Cancelar</button>
//                                 <button type="submit" className="btn-agregar">Agregar</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default CompTablaInst;