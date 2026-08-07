import SlotMachineScene from "@/SlotMachine/slot-machine.scene";
import Hud from "@/HUD/hud";
import { useState, useRef } from "react";

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
  const [canPlay, setCanPlay] = useState(false);
  const [isWinning, setIsWinning] = useState(false);

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
    setIsWinning(false);
  }

  return (
    <div className="page">
      <SlotMachineScene
        setCoins={setCoins}
        setLine={setLine}
        clearLine={clearLine}
        canPlay={canPlay}
        gameStarted={gameInfos.started}
        setCanPlay={setCanPlay}
        setIsWinning={setIsWinning}
      />
      <Hud
        gameInfos={gameInfos}
        setGameInfos={setGameInfos}
        canPlay={canPlay}
        isWinning={isWinning}
      />
    </div>
  );
}
