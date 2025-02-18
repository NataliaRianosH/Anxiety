import { createContext, useContext, useState, useEffect, useRef, useMemo } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";

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
  const partidaVerificada = useRef(false); // ✅ Evita múltiples ejecuciones

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        console.log("Usuario activo al iniciar:", session.user);

        if (!partidaVerificada.current) { // ✅ Se ejecuta solo una vez
          await verificarOCrearPartida(session.user.id);
          partidaVerificada.current = true;
        }
      }
      setLoading(false);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Cambio de sesión detectado:", event);
      setUser(session?.user || null);

      if (event === "SIGNED_IN") {
        if (!partidaVerificada.current && session?.user) {
          verificarOCrearPartida(session.user.id);
          partidaVerificada.current = true;
        }
        navigate("/profile");
      }

      if (event === "SIGNED_OUT") {
        setPartida(null);
        navigate("/login");
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []); // ✅ Solo se ejecuta una vez

  const register = async (email, password, name) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });

    if (error) {
      console.error("Error en el registro:", error.message);
      return;
    }

    navigate("/profile");
  };

  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return error.message;
    }
    return null;
  };

  const resetPassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/reset-password",
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

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });

    if (error) {
      console.error("Error en login con Google:", error.message);
    }
  };

  const logout = async () => {
    console.log("Intentando cerrar sesión...");
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error al cerrar sesión:", error.message);
      return;
    }

    console.log("Sesión cerrada exitosamente");
  };

  const verificarOCrearPartida = async (userId) => {
    if (!userId) return;

    try {
      // Verificar si la partida ya existe
      const { data: partidaExistente, error } = await supabase
        .from("Partida")
        .select("*")
        .eq("user_id", userId)
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error buscando partida:", error.message);
        return;
      }

      if (partidaExistente) {
        console.log("✅ Partida encontrada:", partidaExistente);
        setPartida(partidaExistente);
        return;
      }

      // Intentar crear la partida (manejando restricción única en la base de datos)
      const { data: nuevaPartida, error: errorInsert } = await supabase
        .from("Partida")
        .insert([{ user_id: userId, avatar_name: "default", avatar_skin: "default" }])
        .select()
        .single();

      if (errorInsert) {
        if (errorInsert.code === "23505") { // Código de error de unicidad
          console.warn("⚠️ Ya existe una partida para este usuario.");
          return;
        }
        console.error("Error al crear partida:", errorInsert.message);
        return;
      }

      console.log("✅ Nueva partida creada:", nuevaPartida);
      setPartida(nuevaPartida);
    } catch (err) {
      console.error("Error en verificarOCrearPartida:", err);
    }
  };

  return (
    <AuthContext.Provider value={useMemo(() => ({
      user, login, loginWithGoogle, logout, loading, register, resetPassword, updatePassword, partida
    }), [user, loading, partida])}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
