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


export interface DataBarChart extends Array<[string, number] | [string, string]> {}

export type DataPieChart = [header: [string, string], ...rows: [string, number][]];
