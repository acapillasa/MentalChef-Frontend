import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, } from 'react-router-dom';

const CrearActualizarPregunta = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    pregunta: "",
    respuestas: [{ idRespuesta: null, respuesta: "" }, { idRespuesta: null, respuesta: "" }, { idRespuesta: null, respuesta: "" }, { idRespuesta: null, respuesta: "" }], // Cuatro respuestas
    correcta: 0, // Índice de la respuesta correcta
    curiosidad: "",
    categoria: "",
    dificultad: "", // Añadir estado para la dificultad
    imagen: "",
  });

  const dificultades = ["Facil", "Media", "Dificil"];
  const usuarioId = 103; // Asume que el usuarioId es 103, ajusta según sea necesario

  useEffect(() => {
    fetch("/categorias/categoriasSinEvento")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    const fetchPregunta = async () => {
      if (id) {
        try {
          const response = await fetch(`/preguntas/${id}`);
          const data = await response.json();
          console.log("Datos de la pregunta:", data);
          // Supongamos que 'data.respuestas' es un arreglo de objetos que incluye tanto 'respuesta' como 'id'
          setFormData((prev) => ({
            ...prev,
            pregunta: data.pregunta,
            curiosidad: data.curiosidad,
            categoria: data.categoria, // Ajustar para asignar directamente la categoría
            dificultad: data.dificultad,
            imagen: data.imagen,
            respuestas: data.respuestas.map((r) => ({ idRespuesta: r.idRespuesta, respuesta: r.respuesta })),
            correcta: data.respuestas.findIndex((r) => r.correcta),
          }));
        } catch (error) {
          console.error("Error fetching pregunta:", error);
        }
      }
    };

    fetchPregunta();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (name.startsWith("respuesta-")) {
      const index = parseInt(name.split("-")[1], 10);
      const nuevasRespuestas = [...formData.respuestas];
      nuevasRespuestas[index].respuesta = value;
      setFormData({ ...formData, respuestas: nuevasRespuestas });
    } else if (type === "radio" && name === "correcta") {
      setFormData({ ...formData, correcta: parseInt(value, 10) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let preguntaId = id;
      const newPreguntaData = {
        pregunta: formData.pregunta,
        curiosidad: formData.curiosidad,
        categoria: formData.categoria,
        dificultad: formData.dificultad,
        imagen: formData.imagen,
        usuarioId, // Añadir usuarioId al crear/actualizar
      };

      console.log("Datos de la pregunta:", JSON.stringify(newPreguntaData, null, 2));

      if (id) {
        // Actualizar la pregunta existente
        const preguntaResponse = await fetch(`/preguntas/actualizar/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPreguntaData),
        });

        if (!preguntaResponse.ok) {
          throw new Error("Error al actualizar la pregunta");
        }
      } else {
        // Crear una nueva pregunta
        const preguntaResponse = await fetch("/preguntas/insertar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPreguntaData),
        });

        if (!preguntaResponse.ok) {
          throw new Error("Error al crear la pregunta");
        }

        const preguntaData = await preguntaResponse.json();
        preguntaId = preguntaData.id;
      }

      // Crear o actualizar las respuestas
      const respuestas = formData.respuestas.map((respuesta, index) => ({
        idRespuesta: respuesta.idRespuesta,
        respuesta: respuesta.respuesta,
        correcta: index === formData.correcta,
        preguntaId,
        usuarioId,
      }));

      console.log("Datos de las respuestas:", JSON.stringify(respuestas, null, 2));

      const respuestasResponse = await fetch(id ? `/respuestas/actualizarLista/${id}` : "/respuestas/insertarLista", {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(respuestas),
      });

      if (!respuestasResponse.ok) {
        throw new Error(`Error al ${id ? "actualizar" : "crear"} las respuestas`);
      }

      console.log(`Pregunta y respuestas ${id ? "actualizadas" : "creadas"} con éxito`);
      navigate("/ListaPreguntas");
    } catch (error) {
      console.error("Error al crear/actualizar la pregunta y respuestas:", error);
      alert("Hubo un problema al guardar la pregunta. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="game-creator">
      <form onSubmit={handleSubmit}>
        <div>
          <h3 className="question">Escribe la pregunta:</h3>
          <input
            type="text"
            className="input-question text-secondary"
            placeholder="Escribe tu pregunta aquí"
            name="pregunta"
            value={formData.pregunta || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <h3 className="question">Escribe las respuestas:</h3>
          <div className="answers-grid">
            {formData.respuestas.map((respuesta, index) => (
              <div key={index} className="answer">
                <label>
                  <input
                    type="radio"
                    name="correcta"
                    value={index}
                    checked={formData.correcta === index}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <input
                    type="text"
                    className="input-answer text-secondary"
                    placeholder={`Respuesta ${index + 1}`}
                    name={`respuesta-${index}`}
                    value={respuesta.respuesta}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="question">Selecciona una categoría:</h3>
          <select
            name="categoria"
            value={formData.categoria}
            className="select-category text-secondary"
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((cat) => (
              <option key={cat.categoria} value={cat.categoria}>
                {cat.categoria}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="question">Selecciona la dificultad:</h3>
          <select
            name="dificultad"
            value={formData.dificultad}
            className="select-difficulty text-secondary"
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una dificultad</option>
            {dificultades.map((dificultad, index) => (
              <option key={index} value={dificultad}>
                {dificultad}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="question">Añade una curiosidad:</h3>
          <textarea
            name="curiosidad"
            value={formData.curiosidad}
            className="input-curiosity text-secondary border"
            onChange={handleChange}
            placeholder="Escribe una curiosidad aquí"
          />
        </div>

        <button type="submit" className="btn-submit bg-blue-500 text-white py-2 px-4 my-4 rounded hover:bg-blue-700">
          Guardar Pregunta
        </button>
      </form>
      <button onClick={() => navigate(-1)} className="btn-back mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700">
        Volver Atrás
      </button>
    </div>
  );
};

export default CrearActualizarPregunta;
