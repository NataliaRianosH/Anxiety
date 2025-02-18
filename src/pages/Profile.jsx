import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase/client"; // Asegúrate de importar Supabase
import "../assets/styles/Profile.scss";
import AvatarView from "../components/AvatarView";

const Profile = () => {
  const { user, logout, partida, reiniciarPartida } = useAuth();
  const navigate = useNavigate();

  const handleReiniciarPartida = async () => {
    const confirmacion = window.confirm("⚠️ ¿Seguro que quieres reiniciar la partida? Perderás todo tu progreso.");
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
  const avatarIncompleto = !partida || !partida.avatar_name || !partida.avatar_skin ||
    partida.avatar_name === "default" || partida.avatar_skin === "default";

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
          estado: true
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
    <div className="wrapper-profile">
      
      {/* Contenedor principal (2 filas) */}
      <div className="content-container">

        {/* Fila 1: Header */}
        
        {/* Fila 2: Contenedor dividido en dos columnas */}
        <div className="sections-container">

         {/* Sección del Usuario */}
         <div className="user-section">
              {user ? (
                <div className="user-info">
                  <h2><strong>Bienvenido:</strong> {user.user_metadata?.full_name}</h2>
                  <p><strong>Email:</strong> {user.email}</p>

                  {/* Mostrar información del avatar */}
                  {partida ? (
                    <>
                      <h3>Tu avatar</h3>
                      <p><strong>Nombre:</strong> {partida.avatar_name}</p>
                      <p><strong>Skin:</strong> {partida.avatar_skin}</p>
                    </>
                  ) : (
                    <p>No te olvides de crear un avatar.</p>
                  )}

                  {/* Mostrar estado de la partida */}
                  {avatarIncompleto ? (
                    <>
                      <p>⚠️ Para jugar, primero debes crear un avatar.</p>
                    </>
                  ) : partida.estado ? (
                    <>
                      <p>Continúa tu partida</p>
                      <button className="user-button" onClick={() => navigate("/game")}>Continuar</button>
                      <button className="user-button" onClick={handleReiniciarPartida}>🔄 Reiniciar Partida</button>
                    </>
                  ) : partida.veces_jugadas === 0 ? (
                    <>
                      <p>¡Bienvenido! ¿Listo para jugar por primera vez?</p>
                      <button className="user-button" onClick={iniciarPartida}>Empezar Aventura</button>
                    </>
                  ) : (
                    <>
                      <p>Partida terminada. ¿Quieres jugar otra vez?</p>
                      <button className="user-button" onClick={iniciarPartida}>Jugar de nuevo</button>
                    </>
                  )}

                  <button className="logout-button" onClick={logout}>Cerrar sesión</button>
                </div>
              ) : (
                <p>No hay usuario autenticado.</p>
              )}
            </div>
          
          {/*  Columna Izquierda: Avatar */}
          <div className="avatar-section">
              
                <AvatarView style={{ width: "100%", height: "100%" , backgroundColor: "orange"}} avatarSkin={partida.avatar_skin} />
              
              <button className="avatar-button" onClick={() => navigate("/avatar")}>
                {avatarIncompleto ? "Crear Avatar" : "Cambiar Avatar"}
              </button>
            </div>

          {/*Columna Derecha: Usuario */}
          

        </div>
        
      </div>
    </div>
  </div>
  );
};

export default Profile;
