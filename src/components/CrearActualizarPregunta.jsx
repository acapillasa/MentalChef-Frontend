import React, { useState, useEffect } from "react";

const CrearActualizarPregunta = ({ preguntaId }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    pregunta: "",
    respuestas: ["", "", "", ""], // Cuatro respuestas
    correcta: 0, // Índice de la respuesta correcta
    curiosidad: "",
    categoria: "",
    dificultad: "", // Añadir estado para la dificultad
    imagen: "",
  });

  const dificultades = ["Facil", "Media", "Dificil"];

  useEffect(() => {
    fetch("http://10.14.1.17:8080/categorias")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    const fetchPregunta = async () => {
      if (preguntaId) {
        try {
          const response = await fetch(
            `http://10.14.1.17:8080/preguntas/${preguntaId}`
          );
          const data = await response.json();
          console.log("Datos de la pregunta:", data);
          // Supongamos que 'data.respuestas' es un arreglo de objetos que incluye tanto 'respuesta' como 'id'
          setFormData((prev) => ({
            ...prev,
            pregunta: data.pregunta,
            curiosidad: data.curiosidad,
            categoria: data.categoria.categoria,
            dificultad: data.dificultad,
            imagen: data.imagen,
            respuestas:
              data.respuestas.map((res) => ({
                id: res.id, // Asegúrate de incluir el ID de la respuesta
                respuesta: res.respuesta,
                correcta: res.correcta,
              })) || prev.respuestas,
            correcta:
              data.respuestas.findIndex((res) => res.correcta) !== -1
                ? data.respuestas.findIndex((res) => res.correcta)
                : 0,
          }));
        } catch (error) {
          console.error("Error fetching pregunta:", error);
        }
      }
    };
    fetchPregunta();
  }, [preguntaId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAnswerChange = (index, value) => {
    const newRespuestas = [...formData.respuestas];
    newRespuestas[index] = value;
    setFormData({
      ...formData,
      respuestas: newRespuestas,
    });
  };

  const handleCorrectAnswerChange = (index) => {
    setFormData({
      ...formData,
      correcta: index,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = `images/categorias/${formData.categoria}.jpg`;

    const preguntaData = {
      pregunta: formData.pregunta,
      curiosidad: formData.curiosidad,
      categoria: {
        categoria: formData.categoria,
      },
      dificultad: formData.dificultad,
      imagen: imageUrl,
      fechacreacion: new Date().toISOString(),
      fechaactualizacion: new Date().toISOString(),
      usuario: {
        id: 103,
      },
    };

    try {
      let preguntaResponse;
      if (preguntaId) {
        preguntaResponse = await fetch(
          `http://10.14.1.17:8080/preguntas/actualizar/${preguntaId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(preguntaData),
          }
        );
      } else {
        preguntaResponse = await fetch(
          "http://10.14.1.17:8080/preguntas/insertar",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(preguntaData),
          }
        );
      }

      if (!preguntaResponse.ok) {
        throw new Error("Error en la actualización/inserción de la pregunta");
      }

      const preguntaResult = await preguntaResponse.json();
      const preguntaIdResponse = preguntaResult.id;

      // Asegúrate de que las respuestas incluyan los IDs
      const respuestasData = formData.respuestas.map((respuesta, index) => ({
        id: respuesta.id || null, // Usa el ID existente o null si es una nueva respuesta
        respuesta: respuesta.respuesta,
        correcta: index === formData.correcta ? 1 : 0,
        preguntaId: preguntaIdResponse,
        usuarioId: 103,
      }));

      // Inserta o actualiza las respuestas
      await Promise.all(
        respuestasData.map(async (respuesta) => {
          const method = respuesta.id ? "PUT" : "POST"; // Decide si es una actualización o inserción
          const url = respuesta.id
            ? `http://10.14.1.17:8080/respuestas/actualizar/${respuesta.id}`
            : "http://10.14.1.17:8080/respuestas/insertar";

          await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(respuesta),
          });
        })
      );

      setFormData({
        pregunta: "",
        respuestas: [
          { id: null, respuesta: "" },
          { id: null, respuesta: "" },
          { id: null, respuesta: "" },
          { id: null, respuesta: "" },
        ],
        correcta: 0,
        curiosidad: "",
        categoria: "",
        dificultad: "",
        imagen: "",
      });

      console.log("Pregunta y respuestas creadas/actualizadas con éxito");
    } catch (error) {
      console.error(
        "Error al crear/actualizar la pregunta y respuestas:",
        error
      );
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
            className="input-question"
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
                    className="radio-btn"
                    value={index}
                    checked={formData.correcta === index}
                    onChange={() => handleCorrectAnswerChange(index)}
                  />
                  <input
                    type="text"
                    placeholder={`Respuesta ${index + 1}`}
                    value={respuesta.respuesta || ""}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    required
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="question">Selecciona la categoría:</h3>
          <select
            name="categoria"
            value={formData.categoria}
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
            onChange={handleChange}
            placeholder="Escribe aquí la curiosidad relacionada con la pregunta"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          {preguntaId ? "Actualizar" : "Enviar"}
        </button>
      </form>
    </div>
  );
};

export default CrearActualizarPregunta;
