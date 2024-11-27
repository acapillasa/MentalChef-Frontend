import React, { useState, useEffect } from "react";

const EditarPerfil = ({ user }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [monedas, setMonedas] = useState(0);
  const [rol, setRol] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setNombre(user.username);
      setEmail(user.email);
      setMonedas(user.monedaV);
      setRol(user.role);
    }
  }, [user]);

  if (!user) {
    return <div className="text-center text-secondary">Cargando...</div>;
  }

  const handleGuardar = async () => {
    if (!nombre || !email || !monedas) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    const userUpdateDto = {
      username: nombre,
      email: email,
      password: password,
      monedaV: monedas
    };

    try {
      const response = await fetch(`/usuarios/actualizar/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userUpdateDto),
      });

      if (!response.ok) {
        throw new Error('Error en la actualización del perfil');
      }

      const data = await response.json();
      console.log("Perfil actualizado:", data);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-secondary">Editar Perfil</h2>
      <label className="block mb-2 text-secondary">
        Nombre:
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </label>
      <label className="block mb-2 text-secondary">
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </label>
      <label className="block mb-2 text-secondary relative">
        Contraseña:
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        <span
          className="absolute right-3 top-9 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "🐣" : "🥚"}
        </span>
      </label>
      {rol === 'ROLE_CHEF' && (
        <div className="mb-4">
          <label className="block mb-2 text-secondary">
            Monedas:
            <input
              type="number"
              value={monedas}
              onChange={(e) => setMonedas(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </label>
        </div>
      )}
      <button
        onClick={handleGuardar}
        className="w-full bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-600"
      >
        Guardar
      </button>
    </div>
  );
};

export default EditarPerfil;