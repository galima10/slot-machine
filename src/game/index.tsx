import SlotMachineScene from "@/SlotMachine/slot-machine.scene";
import { useEffect, useState } from "react";

export default function GamePage() {
  const [currentCoins, setCurrentCoins] = useState(5);
  const [currentLine, setCurrentLine] = useState([]);
  useEffect(() => {
    console.log(`Pièces: ${currentCoins}`);
  }, [currentCoins]);
  useEffect(() => {
    console.log(`Sortie actuelle: ${currentLine}`);
  }, [currentLine]);

  function setCoins(delta: number) {
    if (currentCoins <= 0) return;
    setCurrentCoins((prev) => prev + delta);
  }
  function setLine(symbol: string) {
    if (currentLine.length >= 3) return;
    setCurrentLine((prev) => [...prev, symbol]);
  }
  function clearLine(){
    setCurrentLine([])
  }
  return (
    <div className="page">
      <SlotMachineScene setCoins={setCoins} setLine={setLine} clearLine={clearLine} />
    </div>
  );
}
