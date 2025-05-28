import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../assets/styles/Profile.scss";
import AvatarView from "../components/AvatarView";
import HomeMenu from "../components/HomeMenu";
import { useState } from "react";

const Home = () => {
  const { user, logout, partida, reiniciarPartida } = useAuth();
  const navigate = useNavigate();
  const [avatarSeleccionado, setAvatarSeleccionado] = useState(
    partida?.avatar_skin || "Man"
  );
  const { actualizarSkinAvatar } = useAuth();

  const handleReiniciarPartida = async () => {
    const confirmacion = window.confirm(
      " ¿Seguro que quieres reiniciar la partida? Perderás todo tu progreso."
    );
    if (confirmacion) {
      const result = await reiniciarPartida();
      if (result.success) {
        navigate("/game");
      } else {
        alert("Error al reiniciar la partida: " + result.error);
      }
    }
  };

  // Verificar si el usuario tiene un avatar válido (no vacío ni "default")
  const avatarIncompleto =
    !partida ||
    !partida.avatar_name ||
    !partida.avatar_skin ||
    partida.avatar_name === "default" ||
    partida.avatar_skin === "default";

  // Función para iniciar una nueva partida o reiniciar una existente
  const iniciarPartida = async () => {
    if (!user || !partida) {
      alert("No se encontró la partida.");
      return;
    }

    try {
      const { error } = await supabase
        .from("Partida")
        .update({
          estado: true,
        })
        .eq("user_id", user.id);

      if (error) {
        console.error("Error al iniciar la partida:", error.message);
        alert("Error al iniciar partida: " + error.message);
        return;
      }

      console.log("Partida iniciada correctamente");

      // Redirigir al juego después de actualizar el estado
      navigate("/game");
    } catch (err) {
      console.error("Error en iniciarPartida:", err);
      alert("Error inesperado al iniciar la partida.");
    }
  };

  return (
    <div className="profile-page">
      <HomeMenu />
      <div className="wrapper-profile">
        <div className="avatar-section">
          <AvatarView
            avatarSkin={partida?.avatar_skin}
            onAvatarChange={(skin) => setAvatarSeleccionado(skin)}
          />
          {avatarSeleccionado !== partida?.avatar_skin && (
            <p
              className="avatar-select-text"
              onClick={async () => {
                const confirmacion = window.confirm(
                  "¿Deseas cambiar tu avatar?"
                );
                if (!confirmacion) return;

                const result = await actualizarSkinAvatar(avatarSeleccionado);

                if (result.success) {
                  alert("¡Skin del avatar actualizada correctamente!");
                } else {
                  alert("Error al actualizar: " + result.error);
                }
              }}
            >
              Seleccionar avatar
            </p>
          )}
        </div>
      </div>

      <button className="continuar-button" onClick={() => navigate("/game")}>
        Continuar Partida
      </button>
    </div>
  );
};

export default Home;
