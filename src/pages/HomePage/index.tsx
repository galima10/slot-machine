import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="page">
      <h1>Home</h1>
      <button onClick={() => navigate("/game")}>Jouer</button>
    </div>
  );
}
