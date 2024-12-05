import React, { useState, useEffect } from "react";
import EditarCategoria from "./EditarCategoria";

const GestionarCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [isEvento, setIsEvento] = useState(false);
  const [editCategoria, setEditCategoria] = useState(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("/categorias/todas");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("Error fetching categorias:", error);
      }
    };

    fetchCategorias();
  }, []);

  const handleDelete = async (categoria) => {
    try {
      const response = await fetch(`/categorias/eliminar/${categoria}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setCategorias(categorias.filter((cat) => cat.categoria !== categoria));
      alert("Categoria eliminada");
      console.log("Success: Categoria eliminada");
    } catch (error) {
      console.error("Error deleting categoria:", error);
    }
  };

  const handleEdit = (categoria) => {
    console.log("Edit categoria:", categoria);
  };

  const handleSave = (newCategoria) => {
    setCategorias(categorias.map(cat => cat.categoria === editCategoria ? { ...cat, categoria: newCategoria } : cat));
    setEditCategoria(null);
  };

  const filteredCategorias = categorias.filter(categoria => 
    isEvento ? categoria.categoria.startsWith('evento_') : !categoria.categoria.startsWith('evento_')
  );

  return (
    <div className="gestionar-categorias-container max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      {editCategoria ? (
        <EditarCategoria
          categoria={editCategoria}
          onSave={handleSave}
          onCancel={() => setEditCategoria(null)}
        />
      ) : (
        <>
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setIsEvento(false)}
              className={`btn ${!isEvento ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'} py-2 px-4 rounded-l-md`}
            >
              Categorias Normales
            </button>
            <button
              onClick={() => setIsEvento(true)}
              className={`btn ${isEvento ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'} py-2 px-4 rounded-r-md`}
            >
              Categorias de Evento
            </button>
          </div>
          <h2 className="text-2xl font-bold mb-6 text-secondary text-center">{isEvento ? "Gestionar Eventos" : "Gestionar Categorias"}</h2>
          <ul>
            {filteredCategorias.map((categoria) => (
              <li key={categoria.categoria} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 p-4 border border-gray-300 rounded-md">
                <span className="text-secondary break-words md:w-1/2">{categoria.categoria}</span>
                <div className="mt-2 md:mt-0 flex">
                  <button
                    onClick={() => setEditCategoria(categoria.categoria)}
                    className="btn btn-secondary mr-2 bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(categoria.categoria)}
                    className="btn btn-danger bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default GestionarCategorias;
