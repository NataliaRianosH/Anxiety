import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { useMindfulness } from "./MindfulnessContext";
import { usePositiveThoughts } from "./PositiveThoughtsContext";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [partida, setPartida] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar sesión al cargar la app
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        //console.log("Usuario activo al iniciar:", session.user);
        await verificarOCrearPartida(session.user.id);
      }
      setLoading(false);
    };

    checkUser();

    // Listener para cambios de sesión (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        //console.log("Cambio de sesión detectado:", event);
        setUser(session?.user || null);
        if (event === "SIGNED_IN") navigate("/home");
        if (event === "SIGNED_OUT") {
          setPartida(null);
          navigate("/login");
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate]);

  const register = async (email, password, name) => {
   
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      return;
    }
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        full_name: name,
      },
    });
    if (updateError) {
      setError(updateError.message);
    } else {
     
      navigate("/home");
    }
  };

  // Inicio de sesión con email/contraseña
  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return error.message; 
    }

    return null; 
  };

  const resetPassword = async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://anxiety-gamma.vercel.app/reset-password",
    });

    if (error) {
      console.error("Error al enviar correo de recuperación:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  };

  const updatePassword = async (newPassword) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      console.error("Error al actualizar contraseña:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  };

  // Inicio de sesión con Google
  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Error en login con Google:", error.message);
      return;
    }
  };

  // Cerrar sesión
  const logout = async () => {
    console.log("Intentando cerrar sesión...");
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error al cerrar sesión:", error.message);
      return;
    }
    navigate("/login");
    console.log("Sesión cerrada exitosamente");
  };

  const verificarOCrearPartida = async (userId) => {
    if (!userId) return;

    try {
      // Buscar si el usuario ya tiene una partida
      const { data: partidaExistente, error } = await supabase
        .from("Partida")
        .select("*")
        .eq("user_id", userId)
        .limit(1) // Evita problemas si hay varias
        .maybeSingle(); // No lanza error si no hay resultados

      if (error) {
        console.error("Error buscando partida:", error.message);
        return;
      }

      if (partidaExistente) {
        //console.log("Partida encontrada:", partidaExistente);
        setPartida(partidaExistente);
        return; // 🚨 IMPORTANTE: Detener aquí si ya hay partida
      } else {
        // Si no hay partida, crear una nueva
        const { data: nuevaPartida, error: errorInsert } = await supabase
          .from("Partida")
          .insert([
            {
              user_id: userId,
              avatar_name: "Avatar1",
              avatar_skin: "default",
              veces_jugadas: 0,
              estado: false,
              ultimo_logro: "",
            },
          ])
          .select()
          .single();

        if (errorInsert) {
          console.error("Error al crear partida:", errorInsert.message);
          return;
        }

        console.log("Nueva partida creada:", nuevaPartida);
        setPartida(nuevaPartida);
      }
    } catch (err) {
      console.error("Error en verificarOCrearPartida:", err);
    }
  };

  const guardarAvatar = async (avatarName, skin) => {
    if (!user) return { success: false, error: "Usuario no autenticado" };

    try {
      const { error } = await supabase
        .from("Partida")
        .update({
          avatar_name: avatarName,
          avatar_skin: skin,
        })
        .eq("user_id", user.id);

      if (error) {
        console.error("Error al actualizar avatar:", error.message);
        return { success: false, error: error.message };
      }

      console.log("Avatar actualizado correctamente");
      navigate("/home");
      return { success: true };
    } catch (err) {
      console.error("Error en guardarAvatar:", err);
      return { success: false, error: err.message };
    }
  };

  const actualizarSkinAvatar = async (nuevaSkin) => {
    if (!user || !partida)
      return { success: false, error: "No hay sesión activa o partida." };

    try {
      const { error } = await supabase
        .from("Partida")
        .update({ avatar_skin: nuevaSkin })
        .eq("user_id", user.id);

      if (error) {
        console.error("Error al actualizar skin del avatar:", error.message);
        return { success: false, error: error.message };
      }

      setPartida((prev) => ({
        ...prev,
        avatar_skin: nuevaSkin,
      }));

      console.log("Skin del avatar actualizada a:", nuevaSkin);
      return { success: true };
    } catch (err) {
      console.error("Error al actualizar skin:", err);
      return { success: false, error: err.message };
    }
  };

  const actualizarNombreAvatar = async (nuevoNombre) => {
    if (!user || !partida)
      return { success: false, error: "No hay sesión activa o partida." };

    try {
      const { error } = await supabase
        .from("Partida")
        .update({ avatar_name: nuevoNombre })
        .eq("user_id", user.id);

      if (error) {
        console.error("Error al actualizar nombre del avatar:", error.message);
        return { success: false, error: error.message };
      }

      setPartida((prev) => ({
        ...prev,
        avatar_name: nuevoNombre,
      }));

      console.log("Nombre del avatar actualizado a:", nuevoNombre);
      return { success: true };
    } catch (err) {
      console.error("Error al actualizar nombre:", err);
      return { success: false, error: err.message };
    }
  };

  const reiniciarPartida = async () => {
    if (!user || !partida) {
      console.error("No hay usuario o partida activa");
      return { success: false, error: "No se encontró la partida" };
    }

    try {
      console.log("Reiniciando partida para usuario:", user.id);

      // Paso 1: Actualizar tabla Partida
      const { error: errorPartida } = await supabase
        .from("Partida")
        .update({
          estado: true,
          ultimo_logro: "",
        })
        .eq("user_id", user.id);

      if (errorPartida) {
        console.error(
          " Error al actualizar tabla Partida:",
          errorPartida.message
        );
        return { success: false, error: errorPartida.message };
      } else {
        console.log(" Tabla Partida actualizada correctamente");
      }

      // Paso 2: Eliminar logros
      const { error: errorLogros } = await supabase
        .from("LogrosUsuario")
        .delete()
        .eq("user_id", user.id);

      if (errorLogros) {
        console.error(" Error al eliminar logros:", errorLogros.message);
        return { success: false, error: errorLogros.message };
      } else {
        console.log(" Logros eliminados correctamente");
      }

      // Paso 3: Estado localx
      setPartida((prev) => ({
        ...prev,
        estado: true,
        ultimo_logro: "",
      }));
      
      console.log("Partida reiniciada y logros eliminados");
      
      return { success: true };
    } catch (err) {
      console.error("Error inesperado en reiniciarPartida:", err);
      return { success: false, error: err.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        partida,
        login,
        loginWithGoogle,
        logout,
        loading,
        register,
        resetPassword,
        updatePassword,
        guardarAvatar,
        reiniciarPartida,
        actualizarSkinAvatar,
        actualizarNombreAvatar,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
