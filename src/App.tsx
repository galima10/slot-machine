import GamePage from "./pages/GamePage";
import HomePage from "./pages/HomePage";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;
