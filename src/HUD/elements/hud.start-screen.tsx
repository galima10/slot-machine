interface HudStartScreenProps {
  startGame: () => void;
}

export default function HudStartScreen({ startGame }: HudStartScreenProps) {
  return (
    <>
      <h1>Machine à sous</h1>
      <button className="start-button" onClick={startGame}>Jouer</button>
    </>
  );
}
