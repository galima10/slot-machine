import HudOutput from "./elements/hud.output";
import HudBalance from "./elements/hud.balance";
import HudPayouts from "./elements/hud.payouts";
import HudControls from "./elements/hud.controls";
import type { GameInfos } from "@/game";
import type { SetStateAction, Dispatch } from "react";
import HudStartScreen from "./elements/hud.start-screen";

interface HUDProps {
  gameInfos: GameInfos;
  setGameInfos: Dispatch<SetStateAction<GameInfos>>;
  canPlay: boolean;
  isWinning: boolean;
}

export default function Hud({
  gameInfos,
  setGameInfos,
  canPlay,
  isWinning,
}: HUDProps) {
  function startGame() {
    console.log("start");
    setGameInfos((prev) => ({
      ...prev,
      started: true,
    }));
  }
  return (
    <div className="hud">
      {canPlay && (
        <>
          <HudOutput output={gameInfos.line} isWinning={isWinning} />
          <HudBalance coins={gameInfos.coins} />
          <HudPayouts />
          <HudControls />
        </>
      )}
      {!gameInfos.started && <HudStartScreen startGame={startGame} />}
    </div>
  );
}
