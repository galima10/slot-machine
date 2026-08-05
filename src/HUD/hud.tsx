import HudOutput from "./elements/hud.output";
import HudBalance from "./elements/hud.balance";
import type { GameInfos } from "@/game";
import type { SetStateAction, Dispatch } from "react";
import HudStartScreen from "./elements/hud.start-screen";

interface HUDProps {
  gameInfos: GameInfos;
  setGameInfos: Dispatch<SetStateAction<GameInfos>>;
}

export default function Hud({ gameInfos, setGameInfos }: HUDProps) {
  function startGame() {
    console.log("start")
    setGameInfos((prev) => ({
      ...prev,
      started: true,
    }));
  }
  return (
    <div className="hud">
      {gameInfos.started ? (
        <>
          <HudOutput output={gameInfos.line} />
          <HudBalance coins={gameInfos.coins} />
        </>
      ) : (
        <HudStartScreen startGame={startGame} />
      )}
    </div>
  );
}
