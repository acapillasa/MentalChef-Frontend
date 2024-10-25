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

  // Definir las opciones de dificultad
  const dificultades = ["Facil", "Media", "Dificil"];

  // Obtener las categorías del servidor
  useEffect(() => {
    fetch("http://localhost:8080/categorias")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Si se está actualizando, obtener los datos de la pregunta
  useEffect(() => {
    const fetchPregunta = async () => {
      if (preguntaId) {
        try {
          const response = await fetch(
            `http://localhost:8080/preguntas/${preguntaId}`
          );
          const data = await response.json();
          console.log("Datos de la pregunta:", data); // Para depuración

          // Verifica si hay respuestas y mapea si es necesario
          setFormData((prev) => ({
            ...prev,
            pregunta: data.pregunta,
            curiosidad: data.curiosidad,
            categoria: data.categoria.categoria,
            dificultad: data.dificultad,
            imagen: data.imagen,
            respuestas:
              data.respuestas.map((res) => res.respuesta) || prev.respuestas,
            correcta:
              data.respuestas.findIndex((res) => res.correcta) !== -1
                ? data.respuestas.findIndex((res) => res.correcta)
                : 0, // Asegúrate de establecer correctamente la respuesta correcta
          }));
        } catch (error) {
          console.error("Error fetching pregunta:", error);
        }
      }
    };

    fetchPregunta();
  }, [preguntaId]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar cambios en las respuestas
  const handleAnswerChange = (index, value) => {
    const newRespuestas = [...formData.respuestas];
    newRespuestas[index] = value;
    setFormData({
      ...formData,
      respuestas: newRespuestas,
    });
  };

  // Manejar cambios en la respuesta correcta
  const handleCorrectAnswerChange = (index) => {
    setFormData({
      ...formData,
      correcta: index, // Solo actualiza el índice de la respuesta correcta
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
        // Actualizar la pregunta existente
        preguntaResponse = await fetch(
          `http://localhost:8080/preguntas/actualizar/${preguntaId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(preguntaData),
          }
        );

        // Aquí, suponiendo que tienes las respuestas en formData.respuestas
        const respuestasData = formData.respuestas.map((respuesta, index) => ({
          id: respuesta.id || null, // Asegúrate de que el ID esté incluido, o null si es nuevo
          respuesta: respuesta, // Asume que 'respuesta' es solo texto
          correcta: index === formData.correcta ? 1 : 0, // Aquí se puede cambiar a true/false
      }));
      

        // Actualizar las respuestas de la pregunta
        const respuestaResponse = await fetch(
          `http://localhost:8080/respuestas/actualizar/${preguntaId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(respuestasData), // Envía solo las respuestas
          }
        );

        if (!respuestaResponse.ok) {
          throw new Error("Error al actualizar las respuestas");
        }
      } else {
        // Crear una nueva pregunta
        preguntaResponse = await fetch(
          "http://localhost:8080/preguntas/insertar",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(preguntaData),
          }
        );
      }

      // Imprime el texto de la respuesta
      const responseText = await preguntaResponse.text();
      console.log("Respuesta del servidor:", responseText);

      // Verifica el estado de la respuesta
      if (!preguntaResponse.ok) {
        throw new Error(
          `Error en la petición: ${preguntaResponse.status} ${preguntaResponse.statusText}`
        );
      }

      const preguntaResult = JSON.parse(responseText);
      const preguntaIdResponse = preguntaResult.id; // Cambia aquí para evitar confusión

      const respuestasData = formData.respuestas.map((respuesta, index) => ({
        respuesta: respuesta,
        correcta: index === formData.correcta ? 1 : 0,
        preguntaId: preguntaIdResponse, // Cambia aquí para usar la respuesta de preguntaId
        usuarioId: 103,
      }));

      // Actualiza o inserta las respuestas según sea necesario
      await fetch("http://localhost:8080/respuestas/insertar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(respuestasData),
      });

      setFormData({
        pregunta: "",
        respuestas: ["", "", "", ""],
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
            value={formData.pregunta}
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
            onChange={() => handleCorrectAnswerChange(index)} // Llama a la nueva función
          />
          <input
            type="text"
            placeholder={`Respuesta ${index + 1}`}
            value={respuesta}
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
