import { InstrumentoType } from '../components/types';

export async function fetchInstrumentos(): Promise<InstrumentoType[]> {
  const response = await fetch('http://localhost:8080/api/instrumentos'); // Cambia la URL según tu backend
  console.log(response);
  if (!response.ok) throw new Error('Error al obtener instrumentos');
  return response.json();
}