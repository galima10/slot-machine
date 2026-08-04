import { type ThreeEvent, useFrame } from "@react-three/fiber";
import { useRef, useEffect, type SetStateAction, type Dispatch } from "react";
import * as THREE from "three";

export function useCoin(
  setIsCoinDropping: Dispatch<SetStateAction<boolean>>,
  dropping: boolean,
) {
  const coinRef = useRef<THREE.Group>(null);

  function coinInserted(delta: number) {
    if (!dropping || !coinRef.current) return;
    coinRef.current.children[0].visible = true;

    const minY = 1.3;

    const speed = 8;

    const current = coinRef.current.position.y;

    coinRef.current.position.y = THREE.MathUtils.lerp(
      current,
      minY,
      delta * speed,
    );

    if (Math.abs(coinRef.current.position.y) < 0.01) {
      coinRef.current.position.y = minY;
      setIsCoinDropping(false);
    }
  }

  useFrame((_, delta) => {
    coinInserted(delta);
  });
  return { coinRef };
}
