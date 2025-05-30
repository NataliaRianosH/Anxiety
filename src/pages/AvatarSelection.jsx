import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Importamos el contexto

const AvatarSelection = () => {
  const { guardarAvatar } = useAuth(); // Usamos la función del contexto
  const [avatarName, setAvatarName] = useState("");
  const [skin, setSkin] = useState("");

  const handleGuardar = async (e) => {
    e.preventDefault();
    if (!avatarName || !skin) {
      alert("Debes seleccionar un nombre y un avatar.");
      return;
    }

    const result = await guardarAvatar(avatarName, skin);
    if (result.success) {
      alert("Avatar guardado correctamente.");
    } else {
      alert("Error: " + result.error);
    }
  };

  return (
    <div>
      <h2>Selecciona un avatar</h2>

      <button onClick={() => setSkin("Avatar1")}>Avatar1</button>
      <button onClick={() => setSkin("Avatar2")}>Avatar2</button>
      <button onClick={() => setSkin("Avatar3")}> Avatar3</button>

      <p>Dale un nombre</p>
      <form onSubmit={handleGuardar}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={avatarName}
            onChange={(e) => setAvatarName(e.target.value)}
            required
          />
        </div>

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default AvatarSelection;
