export interface CategoriaType {
  id: number;
  nombre: string;
}

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
  categoria?: CategoriaType; 
}