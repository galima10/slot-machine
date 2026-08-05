import * as THREE from "three";
import { symbols } from "@/SlotMachine/constants/symbols";

export function createReelTexture(symbolsText: string[]) {
  const canvas = document.createElement("canvas");

  const symbolSize = 256;
  const height = 1024;

  canvas.width = symbolsText.length * symbolSize;
  canvas.height = height;

  const ctx = canvas.getContext("2d")!;

  symbolsText.forEach((symbol, index) => {
    const x = index * symbolSize;

    // case
    ctx.fillStyle = "#fff";
    ctx.fillRect(x, 0, symbolSize, height);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;

    ctx.strokeRect(x, 0, symbolSize, height);

    ctx.save();

    ctx.translate(x + symbolSize / 2, height / 1.35);

    ctx.rotate(-Math.PI / 2);
    ctx.scale(-1, 1);

    ctx.fillStyle = "black";
    ctx.font = "bold 120px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.filter = "brightness(0.6)";
    ctx.shadowColor = "rgba(0, 0, 0, 1)";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.fillText(symbols[symbol], 0, 0);

    ctx.restore();
  });

  const texture = new THREE.CanvasTexture(canvas);

  texture.needsUpdate = true;

  return texture;
}
