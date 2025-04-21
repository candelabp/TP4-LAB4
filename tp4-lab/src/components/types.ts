export interface InstrumentoType {
  id: string;
  instrumento: string;
  marca: string;
  modelo: string;
  descripcion: string;
  imagen: string;
  precio: number;
  costoEnvio: string;
  cantidadVendida: number;
  activo: boolean;
  categoria: {
      id: number;
      nombre: string;
  };
}