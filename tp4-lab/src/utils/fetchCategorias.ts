import { CategoriaType } from '../components/types';

export async function fetchCategorias(): Promise<CategoriaType[]> {
  const response = await fetch('http://localhost:8080/api/categorias');
  if (!response.ok) throw new Error('Error al obtener categorías');
  return response.json();
}