import React, { useState, useEffect } from "react";

const CrearPregunta = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const imageUrl = `images/categorias/${formData.categoria}.jpg`;
  
    const preguntaData = {
      pregunta: formData.pregunta,
      curiosidad: formData.curiosidad,
      categoria: formData.categoria,
      dificultad: formData.dificultad,
      imagen: imageUrl,
      fechacreacion: new Date().toISOString(),
      fechaactualizacion: new Date().toISOString(),
      usuario: 103,
    };
  
    try {
      const preguntaResponse = await fetch("http://localhost:8080/preguntas/insertar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preguntaData),
      });
  
      // Imprime el texto de la respuesta
      const responseText = await preguntaResponse.text();
      console.log("Respuesta del servidor:", responseText);
  
      // Verifica el estado de la respuesta
      if (!preguntaResponse.ok) {
        throw new Error(`Error en la petición: ${preguntaResponse.status} ${preguntaResponse.statusText}`);
      }
  
      // Intenta convertir a JSON
      const preguntaResult = JSON.parse(responseText);
      const preguntaId = preguntaResult.id;
  
      const respuestasData = formData.respuestas.map((respuesta, index) => ({
        respuesta: respuesta,
        correcta: index === formData.correcta ? 1 : 0,
        preguntaId: preguntaId,
        usuarioId: 103,
      }));
  
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
  
      console.log("Pregunta y respuestas creadas con éxito");
    } catch (error) {
      console.error("Error al crear la pregunta y respuestas:", error);
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
                    onChange={handleChange}
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
          Enviar
        </button>
      </form>
    </div>
  );
};

export default CrearPregunta;
