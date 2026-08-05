import { useMemo } from "react";
import { MeshLambertMaterial } from "three";
import { createReelTexture } from "@/SlotMachine/utils/createReelTexture";
import { generateReelsSymbols } from "@/SlotMachine/utils/generateReelsSymbols";

export function getMachineMaterials() {
  const reels = useMemo(() => generateReelsSymbols(), []);

  const reelTexture1 = useMemo(() => createReelTexture(reels.reel1), []);
  const reelTexture2 = useMemo(() => createReelTexture(reels.reel2), []);
  const reelTexture3 = useMemo(() => createReelTexture(reels.reel3), []);

  const reelMaterial1 = useMemo(
    () =>
      new MeshLambertMaterial({
        map: reelTexture1,
      }),
    [reelTexture1],
  );

  const reelMaterial2 = useMemo(
    () =>
      new MeshLambertMaterial({
        map: reelTexture2,
      }),
    [reelTexture2],
  );

  const reelMaterial3 = useMemo(
    () =>
      new MeshLambertMaterial({
        map: reelTexture3,
      }),
    [reelTexture3],
  );

  const machineMaterials = {
    body: {
      default: useMemo(
        () =>
          new MeshLambertMaterial({
            color: "#43366c",
          }),
        [],
      ),
      active: useMemo(
        () =>
          new MeshLambertMaterial({
            color: "#624f9e",
          }),
        [],
      ),
    },
    rod: useMemo(
      () =>
        new MeshLambertMaterial({
          color: "#ffffff",
        }),
      [],
    ),
    handle: {
      default: useMemo(
        () =>
          new MeshLambertMaterial({
            color: "#900b0b",
          }),
        [],
      ),
      active: useMemo(
        () =>
          new MeshLambertMaterial({
            color: "#c91d1d",
          }),
        [],
      ),
    },
  };
  return {
    reels,
    reelMaterials: {
      reel1: reelMaterial1,
      reel2: reelMaterial2,
      reel3: reelMaterial3,
    },
    machineMaterials,
  };
}
