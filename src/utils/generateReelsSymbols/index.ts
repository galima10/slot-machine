import {
  reel1Map,
  reel2Map,
  reel3Map,
  type ReelMap,
} from "@/constants/symbols";

function generateReel(map: ReelMap): string[] {
  const finalReel: string[] = [];
  for (const symbol of Object.keys(map)) {
    for (let i = 0; i < map[symbol]; i++) {
      finalReel.push(symbol);
    }
  }
  return finalReel;
}

function blendReelSymbols(reel: string[]): string[] {
  for (let i = reel.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [reel[i], reel[j]] = [reel[j], reel[i]];
  }
  return reel;
}

export function generateReelsSymbols() {
  return {
    reel1: blendReelSymbols(generateReel(reel1Map)),
    reel2: blendReelSymbols(generateReel(reel2Map)),
    reel3: blendReelSymbols(generateReel(reel3Map)),
  };
}
