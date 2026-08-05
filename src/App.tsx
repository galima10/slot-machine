import { lazy } from "react";

const GamePage = lazy(() => import("./game"));

function App() {
  return (
    <>
      <main id="main-content">
        <GamePage />
      </main>
    </>
  );
}

export default App;
