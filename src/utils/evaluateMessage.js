export const evaluateMessage = async (message) => {
    console.log("API KEY:", import.meta.env.VITE_OPENAI_API_KEY);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // o "gpt-4o-mini" si prefieres
        messages: [
          {
            role: "system",
            content: "Eres un asistente que ayuda a identificar si un mensaje escrito por un usuario es positivo y motivacional.",
          },
          {
            role: "user",
            content: `¿Este mensaje es positivo y motivacional? "${message}". Responde solo 'Sí' si la respuestá es positiva o 'No' indicando como mejorarlo muy brevemente`,
          },
        ],
      }),
    });
  
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${await response.text()}`);
    }
  
    const data = await response.json();
    return data.choices?.[0]?.message?.content ?? "Sin respuesta de la IA";
  };
  