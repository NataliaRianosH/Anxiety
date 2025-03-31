import { createContext, useContext } from "react";
import { useAnxietyAttack } from "./useAnxietyAttack";

const AnxietyContext = createContext();

export const useAnxiety = () => useContext(AnxietyContext);

export const AnxietyProvider = ({ children }) => {
  const value = useAnxietyAttack();

  return (
    <AnxietyContext.Provider value={value}>
      {children}
    </AnxietyContext.Provider>
  );
};
