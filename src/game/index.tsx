import SlotMachineScene from "@/SlotMachine/slot-machine.scene";
import HUD from "@/HUD/hud";
import { useEffect, useState } from "react";

export interface GameInfos {
  coins: number;
  line: string[];
}

export default function GamePage() {
  const [gameInfos, setGameInfos] = useState<GameInfos>({
    coins: 100,
    line: [],
  });

  function setCoins(delta: number) {
    if (gameInfos.coins <= 0) return;
    setGameInfos((prev) => ({
      ...prev,
      coins: prev.coins + delta,
    }));
  }
  function setLine(symbol: string) {
    if (gameInfos.line.length >= 3) return;
    setGameInfos((prev) => ({
      ...prev,
      line: [...prev.line, symbol],
    }));
  }
  function clearLine() {
    setGameInfos((prev) => ({
      ...prev,
      line: [],
    }));
  }
  return (
    <div className="page">
      <SlotMachineScene
        setCoins={setCoins}
        setLine={setLine}
        clearLine={clearLine}
      />
      <HUD gameInfos={gameInfos} />
    </div>
  );
}
