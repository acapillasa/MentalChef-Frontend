import React, { useState, useEffect } from "react";
import MonedaVirtual from "./MonedaVirtual";

const TiendaVirtual = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("/tienda/productos");
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProductos();
  }, []);

  // Función para crear el texto rotativo
  const RotatingText = ({ text }) => {
    return (
      <div className="flex justify-center mb-8">
        {text.split("").map((letter, index) => (
          <span
            key={index}
            className="text-4xl font-bold inline-block animate-spin-slow"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {letter}
          </span>
        ))}
      </div>
    );
  };

  const handleComprar = async (idProducto) => {
    try {
      const response = await fetch(`/tienda/comprar/${idProducto}`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Error al realizar la compra');
      }
      alert('Compra realizada con éxito');
    } catch (error) {
      console.error('Error al realizar la compra:', error);
      alert('Error al realizar la compra');
    }
  };

  return (
    <div className="p-6 text-secondary">
      <RotatingText text="Tienda Virtual" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="bg-white rounded-lg shadow-lg p-6 relative"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${producto.imagen})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.2,
                zIndex: -1,
              }}
            ></div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{producto.nombre}</h3>
              <MonedaVirtual cantidad={producto.costeV} />
            </div>
            <p className="mb-4">{producto.descripcion}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">{producto.coste} €</span>
              <button
                className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-hover"
                onClick={() => handleComprar(producto.id)}
              >
                Comprar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TiendaVirtual;
