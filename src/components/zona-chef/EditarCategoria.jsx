
import React, { useState, useEffect } from "react";

const EditarCategoria = ({ categoria, onSave, onCancel }) => {
  const [nombre, setNombre] = useState(categoria);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/categorias/actualizar/${categoria}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoria: nombre }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      onSave(nombre);
    } catch (error) {
      console.error("Error editing categoria:", error);
    }
  };

  return (
    <div className="editar-categoria-container max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-secondary text-center">Editar Categoria</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
            Nombre de la Categoria
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-primary bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarCategoria;