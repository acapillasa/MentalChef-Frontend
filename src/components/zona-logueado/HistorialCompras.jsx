
import React, { useState, useEffect } from "react";

const HistorialCompras = () => {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const response = await fetch("/tienda/historialCompras", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Error al obtener el historial de compras");
        }
        const data = await response.json();
        setHistorial(data);
      } catch (error) {
        console.error("Error al obtener el historial de compras:", error);
      }
    };

    fetchHistorial();
  }, []);

  return (
    <div className="p-6 text-secondary">
      <h2 className="text-2xl font-bold mb-4">Historial de Compras</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {historial.map((compra) => (
          <div key={compra.id} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold">{compra.productoNombre}</h3>
            <p className="mb-4">{compra.descripcion}</p>
            <span className="text-lg font-bold">{compra.coste} €</span>
            <p className="text-sm text-gray-500">{new Date(compra.fecha).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistorialCompras;