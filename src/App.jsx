import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Story from "./pages/Story";
import AvatarSelection from "./pages/AvatarSelection";
import Profile from "./pages/Profile";
import Instructions from "./pages/Instructions";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { KeyboardControls } from "@react-three/drei";
import GameView from "./pages/GameView";
import { AchievementsProvider } from "./context/AchievementsContext";
import { PositiveThoughtsProvider } from "./context/PositiveThoughtsContext";
import { MindfulnessProvider } from "./context/MindfulnessContext";
import { MiniGamesManagerProvider } from "./context/MiniGamesManagerContext";


function App() {
  const [count, setCount] = useState(0);

  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "left", keys: ["ArrowLeft", "KeyA"] },
    { name: "right", keys: ["ArrowRight", "KeyD"] },
    { name: "run", keys: ["Shift"] },
    { name: "jump", keys: ["Space"] },
  ];

  return (
    <MiniGamesManagerProvider>
      <PositiveThoughtsProvider>
      <AchievementsProvider>
        <MindfulnessProvider>
         
            <KeyboardControls map={keyboardMap}>
              <main>
                <Router>
                  <AuthProvider>
                    <Routes>
                      <Route path="/" element={<Login />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                      />
                      <Route
                        path="/reset-password"
                        element={<ResetPassword />}
                      />
                      <Route path="/instructions" element={<Instructions />} />
                      <Route path="/avatar" element={<AvatarSelection />} />
                      <Route path="/game" element={<GameView />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/story" element={<Story />} />
                      <Route path="/register" element={<Register />} />
                    </Routes>
                  </AuthProvider>
                </Router>
              </main>
            </KeyboardControls>
        </MindfulnessProvider>
        </AchievementsProvider>

      </PositiveThoughtsProvider>
    </MiniGamesManagerProvider>
  );
}

export default App;
