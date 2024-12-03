import React, { useState, useEffect } from "react";

const HistorialCompras = () => {
  const [historial, setHistorial] = useState([]);
  const [visiblePurchaseId, setVisiblePurchaseId] = useState(null);

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
        console.log("Historial de compras:", data);
      } catch (error) {
        console.error("Error al obtener el historial de compras:", error);
      }
    };

    fetchHistorial();
  }, []);

  const sortedHistorial = historial.sort((a, b) => new Date(b.fechaCompra) - new Date(a.fechaCompra));

  const handleToggleCode = (purchaseId) => {
    setVisiblePurchaseId(visiblePurchaseId === purchaseId ? null : purchaseId);
  };

  return (
    <div className="compras-espacio p-6 text-secondary">
      <h2 className="text-2xl font-bold mb-4">Historial de Compras</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sortedHistorial.map((compra) => (
          <div key={`${compra.id.tienda.id}-${compra.fechaCompra}`} className="compras bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold">{compra.id.tienda.nombre}</h3>
            <p className="mb-4">{compra.id.tienda.descripcion}</p>
            <span className="text-lg font-bold">{compra.id.tienda.coste} €</span>
            <p className="text-sm text-gray-500">{new Date(compra.fechaCompra).toLocaleDateString()}</p>
            <button 
              onClick={() => handleToggleCode(compra.id.purchaseId)} 
              className="mt-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded"
            >
              {visiblePurchaseId === compra.id.purchaseId ? "Ocultar Código" : "Mostrar Código"}
            </button>
            {visiblePurchaseId === compra.id.purchaseId && (
              <p className="codigo mt-2 text-sm text-gray-700 bg-yellow-100 border-l-4 border-yellow-500 p-4">
                <span className="font-bold">Código de compra:</span> {compra.id.purchaseId}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistorialCompras;