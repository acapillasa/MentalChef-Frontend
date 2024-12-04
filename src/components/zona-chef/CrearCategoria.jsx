import React, { useState } from "react";

const CrearCategoria = () => {
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [isEvento, setIsEvento] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedCategoria = isEvento ? `evento_${categoria.replace(/\s+/g, "_")}` : categoria;
    const categoriaDto = { categoria: formattedCategoria, descripcion };
    try {
      const response = await fetch("/categorias/insertar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoriaDto),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Success: Categoria creada");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="crear-evento-container max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setIsEvento(true)}
          className={`btn ${isEvento ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'} py-2 px-4 rounded-l-md`}
        >
          Crear Evento
        </button>
        <button
          onClick={() => setIsEvento(false)}
          className={`btn ${!isEvento ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'} py-2 px-4 rounded-r-md`}
        >
          Crear Categoria
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-6 text-secondary text-center">{isEvento ? 'Crear Evento' : 'Crear Categoria'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label className="block text-gray-700 font-bold mb-2">Categoria</label>
          <div className="flex">
            {isEvento && (
              <input
                type="text"
                readOnly
                value="evento_"
                className="form-control w-1/4 px-3 py-2 mr-1 border border-gray-300 text-secondary rounded-md bg-gray-100 cursor-not-allowed"
              />
            )}
            <input
              type="text"
              id="categoria"
              name="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className={`form-control ${isEvento ? 'w-1/2 ml-1' : 'w-full'} px-3 py-2 border border-gray-300 text-secondary rounded-md`}
            />
          </div>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="descripcion" className="block text-gray-700 font-bold mb-2">Descripcion</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="form-control w-full px-3 py-2 border text-secondary border-gray-300 rounded-md"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-full bg-primary text-white py-2 rounded-md hover:bg-primary-hover">
          {isEvento ? 'Crear Evento' : 'Crear Categoria'}
        </button>
      </form>
    </div>
  );
};

export default CrearCategoria;