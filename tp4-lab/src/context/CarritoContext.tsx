import React, { createContext, useContext, useState } from 'react';
import { InstrumentoType } from '../Entidades/types';

interface CarritoItem {
  instrumento: InstrumentoType;
  cantidad: number;
}

interface CarritoContextType {
  carrito: CarritoItem[];
  agregarAlCarrito: (instrumento: InstrumentoType) => void;
  eliminarDelCarrito: (id: number) => void;
  vaciarCarrito: () => void;
  setCarrito: React.Dispatch<React.SetStateAction<CarritoItem[]>>; // <-- IMPORTANTE
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export const CarritoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [carrito, setCarrito] = useState<CarritoItem[]>([]);

  const agregarAlCarrito = (instrumento: InstrumentoType) => {
    setCarrito(prevCarrito => {
      const itemExistente = prevCarrito.find(item => Number(item.instrumento.id) === Number(instrumento.id));
      if (itemExistente) {
        return prevCarrito.map(item =>
          Number(item.instrumento.id) === Number(instrumento.id)
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prevCarrito, { instrumento, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (id: number) => {
    setCarrito(prevCarrito =>
      prevCarrito.filter(item => Number(item.instrumento.id) !== id)
    );
  };

  const vaciarCarrito = () => setCarrito([]);

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito, setCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe usarse dentro de un CarritoProvider');
  }
  return context;
};