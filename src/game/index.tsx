import SlotMachineScene from "@/SlotMachine/slot-machine.scene";
import Hud from "@/HUD/hud";
import { useState, useRef } from "react";
import { OrbitControls } from "three-stdlib";

export interface GameInfos {
  started: boolean;
  coins: number;
  line: string[];
}

export default function GamePage() {
  const [gameInfos, setGameInfos] = useState<GameInfos>({
    started: false,
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

  const canMove = useRef(false)
  return (
    <div className="page">
      <SlotMachineScene
        setCoins={setCoins}
        setLine={setLine}
        clearLine={clearLine}
        gameStarted={gameInfos.started}
        canMove={canMove}
      />
      <Hud gameInfos={gameInfos} setGameInfos={setGameInfos} />
    </div>
  );
}
