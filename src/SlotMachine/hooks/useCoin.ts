import { useFrame } from "@react-three/fiber";
import type { RefObject } from "react";
import { type Group, MathUtils } from "three";

export function useCoin(
  coinDropping: RefObject<boolean>,
  coinRef: RefObject<Group>,
) {
  function coinInserted(delta: number) {
    if (!coinDropping.current || !coinRef.current) return;
    coinRef.current.children[0].visible = true;

    const minY = 1.375;

    const speed = 8;

    const current = coinRef.current.position.y;

    coinRef.current.position.y = MathUtils.lerp(current, minY, delta * speed);

    if (Math.abs(coinRef.current.position.y) < 0.01) {
      coinRef.current.position.y = minY;
      coinDropping.current = false;
    }
  }

  useFrame((_, delta) => {
    coinInserted(delta);
  });
  return { coinInserted };
}
