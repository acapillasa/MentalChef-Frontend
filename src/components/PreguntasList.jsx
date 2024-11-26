import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollToTopButton from './ScrollToTopButton';
import ScrollToBottomButton from './ScrollToBottomButton';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

library.add(faArrowUp, faArrowDown);

const PreguntasList = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await fetchPreguntas();
      await fetchCategories();
    };
    fetchData();
  }, []);

  const fetchPreguntas = async () => {
    try {
      const response = await fetch("/preguntas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      console.log("Preguntas:", data); // Agrega este console.log para depurar
      setPreguntas(data);
    } catch (error) {
      console.error("Error al obtener preguntas:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/categorias/todas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      console.log("Categories:", data); // Agrega este console.log para depurar
      setCategories(data);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    }
  };

  const handleUpdate = (id) => {
    console.log(`Actualizar pregunta con id: ${id}`);
    navigate(`/editarPregunta/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      // Eliminar respuestas asociadas a la pregunta
      const responseRespuestas = await fetch(`/respuestas/eliminarPorPregunta/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (responseRespuestas.ok) {
        console.log("Respuestas eliminadas correctamente");
        // Eliminar la pregunta
        const responsePregunta = await fetch(`/preguntas/eliminar/${id}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (responsePregunta.ok) {
          setPreguntas(preguntas.filter((pregunta) => pregunta.id !== id));
        } else {
          console.error("Error al eliminar la pregunta");
        }
      } else {
        console.error("Error al eliminar las respuestas de la pregunta");
      }
    } catch (error) {
      console.error("Error al eliminar la pregunta y sus respuestas:", error);
    }
  };

  const handleVerify = async (id) => {
    try {
      const response = await fetch(`/preguntas/verificar/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        setPreguntas(preguntas.map((pregunta) =>
          pregunta.id === id ? { ...pregunta, verificado: true } : pregunta
        ));
      } else {
        console.error("Error al verificar la pregunta");
      }
    } catch (error) {
      console.error("Error al verificar la pregunta:", error);
    }
  };

  const handleUnverify = async (id) => {
    try {
      const response = await fetch(`/preguntas/desverificar/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        setPreguntas(preguntas.map((pregunta) =>
          pregunta.id === id ? { ...pregunta, verificado: false } : pregunta
        ));
      } else {
        console.error("Error al desverificar la pregunta");
      }
    } catch (error) {
      console.error("Error al desverificar la pregunta:", error);
    }
  };

  const filteredPreguntas = preguntas.filter((pregunta) => {
    if (filter === 'verified' && !pregunta.verificado) return false;
    if (filter === 'unverified' && pregunta.verificado) return false;
    if (categoryFilter !== 'all' && pregunta.categoria !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="preguntas-container">
      <h2 className="titulo">Lista de Preguntas</h2>
      <div className="menu flex justify-center space-x-4 mb-4">
        <button className={`py-2 px-4 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setFilter('all')}>
          Todas
        </button>
        <button className={`py-2 px-4 rounded ${filter === 'verified' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setFilter('verified')}>
          Verificadas
        </button>
        <button className={`py-2 px-4 rounded ${filter === 'unverified' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setFilter('unverified')}>
          Sin Verificar
        </button>
        <select className="py-2 px-4 rounded bg-orange-700" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="all">Todas las Categorías</option>
          {categories.map((category) => (
            <option key={category.categoria} value={category.categoria}>{category.categoria}</option>
          ))}
        </select>
      </div>
      <ul className="preguntas-lista">
        {filteredPreguntas.map((pregunta) => (
          <li key={pregunta.id} className="pregunta-item">
            <div className="pregunta-content">
              <strong className="pregunta-texto">{pregunta.pregunta}</strong>
              <p className="pregunta-detalle">
                Dificultad: {pregunta.dificultad}
              </p>
              <p className="pregunta-detalle">
                Verificado: {pregunta.verificado ? "Sí" : "No"}
              </p>
              <p className="pregunta-detalle">
                Categoría: {pregunta.categoria}
              </p>
            </div>
            <div className="pregunta-botones">
              <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700" onClick={() => handleUpdate(pregunta.id)}>
                Actualizar
              </button>
              <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700" onClick={() => handleDelete(pregunta.id)}>
                Eliminar
              </button>
              {pregunta.verificado ? (
                <button className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-700" onClick={() => handleUnverify(pregunta.id)}>
                  Desverificar
                </button>
              ) : (
                <button className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-700" onClick={() => handleVerify(pregunta.id)}>
                  Verificar
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <ScrollToTopButton />
      <ScrollToBottomButton />
    </div>
  );
};

export default PreguntasList;
