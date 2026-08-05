import HudOutput from "./elements/hud.output";
import HudBalance from "./elements/hud.balance";
import type { GameInfos } from "@/game";

interface HUDProps {
  gameInfos: GameInfos;
}

export default function HUD({ gameInfos }: HUDProps) {
  return (
    <div className="hud">
      <HudOutput output={gameInfos.line} />
      <HudBalance coins={gameInfos.coins} />
    </div>
  );
}
