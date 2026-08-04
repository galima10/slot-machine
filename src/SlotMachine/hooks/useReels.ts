import * as THREE from "three";
import { useRef } from "react";
import { type ThreeEvent, useFrame } from "@react-three/fiber";
import type { SetStateAction, Dispatch } from "react";
import { getRandomInt } from "@/utils/getRandomInt";

interface ReelState {
  start: number;
  target: number;
  progress: number;
  duration: number;
  rolling: boolean;
  currentIndex: number;
  targetIndex: number;
}

export function useReels(
  setMachineReady: Dispatch<SetStateAction<boolean>>,
  reels: {
    reel1: string[];
    reel2: string[];
    reel3: string[];
  },
) {
  const symbolAngle = (Math.PI * 2) / 10;
  const halfSymbol = symbolAngle / 2;
  console.table(reels);
  const reel1Ref = useRef<THREE.Mesh>(null);
  const reel2Ref = useRef<THREE.Mesh>(null);
  const reel3Ref = useRef<THREE.Mesh>(null);

  const hasFinished = useRef(false);

  const reel1 = useRef<ReelState>({
    start: 0,
    target: 0,
    progress: 0,
    duration: 2.5,
    rolling: false,
    currentIndex: 0,
    targetIndex: 0,
  });

  const reel2 = useRef<ReelState>({
    start: 0,
    target: 0,
    progress: 0,
    duration: 3.2,
    rolling: false,
    currentIndex: 0,
    targetIndex: 0,
  });

  const reel3 = useRef<ReelState>({
    start: 0,
    target: 0,
    progress: 0,
    duration: 4.0,
    rolling: false,
    currentIndex: 0,
    targetIndex: 0,
  });

  function finishSpin() {
    setTimeout(() => {
      setMachineReady(false);
    }, 1000);
    const finalLine =
      reels.reel1[reel1.current.currentIndex] +
      reels.reel2[reel2.current.currentIndex] +
      reels.reel3[reel3.current.currentIndex];
    // const VIEW_OFFSET = 7;
    // const index1 = (reel1.current.currentIndex + VIEW_OFFSET) % 10;
    // const index2 = (reel2.current.currentIndex + VIEW_OFFSET) % 10;
    // const index3 = (reel3.current.currentIndex + VIEW_OFFSET) % 10;

    // const finalLine = [
    //   reels.reel1[index1],
    //   reels.reel2[index2],
    //   reels.reel3[index3],
    // ];
    console.log(finalLine);
    console.log({
      currentIndex1: reel1.current.currentIndex,
      rotation1: reel1Ref.current?.rotation.y,
      visible1:
        THREE.MathUtils.euclideanModulo(
          reel1Ref.current!.rotation.y,
          Math.PI * 2,
        ) / symbolAngle,
    });
  }
  function getVisibleIndex(mesh: THREE.Mesh) {
    const normalized = THREE.MathUtils.euclideanModulo(
      mesh.rotation.y,
      Math.PI * 2,
    );

    return (
      Math.round(
        THREE.MathUtils.euclideanModulo(normalized - halfSymbol, Math.PI * 2) /
          symbolAngle,
      ) % 10
    );
  }

  function updateReel(reel: ReelState, mesh: THREE.Mesh, delta: number) {
    if (!reel.rolling) return true;

    const speed = 15;

    const direction = reel.target > mesh.rotation.y ? 1 : -1;

    mesh.rotation.y += speed * delta * direction;

    if (
      (direction === 1 && mesh.rotation.y >= reel.target) ||
      (direction === -1 && mesh.rotation.y <= reel.target)
    ) {
      mesh.rotation.y = reel.target;
      reel.currentIndex = reel.targetIndex;

      const indexFromRotation =
        Math.round(
          THREE.MathUtils.euclideanModulo(
            mesh.rotation.y - halfSymbol,
            Math.PI * 2,
          ) / symbolAngle,
        ) % 10;

      console.log({
        targetIndex: reel.currentIndex,
        indexFromRotation,
      });

      // Snap exact sur une position de symbole
      mesh.rotation.y = Math.round(mesh.rotation.y / symbolAngle) * symbolAngle;

      reel.rolling = false;
      return true;
    }

    return false;
  }

  function startSpin() {
    if (!reel1Ref.current || !reel2Ref.current || !reel3Ref.current) return;
    const reel1Index = getRandomInt(10);
    const reel2Index = getRandomInt(10);
    const reel3Index = getRandomInt(10);

    // setupReel(reel1.current, reel1Ref.current, reel1Index, 5);
    // setupReel(reel2.current, reel2Ref.current, reel2Index, 7);
    // setupReel(reel3.current, reel3Ref.current, reel3Index, 9);
    setupReel(reel1.current, reel1Ref.current, 0, 5);
    setupReel(reel2.current, reel2Ref.current, 0, 7);
    setupReel(reel3.current, reel3Ref.current, 0, 9);
  }

  function setupReel(
    reel: ReelState,
    mesh: THREE.Mesh,
    targetIndex: number,
    turns: number,
  ) {
    const distance = (targetIndex - reel.currentIndex + 10) % 10;

    reel.start = mesh.rotation.y;

    reel.target =
      reel.start + turns * Math.PI * 2 + distance * symbolAngle + halfSymbol;

    reel.targetIndex = targetIndex;

    reel.rolling = true;
  }

  function startMachine() {
    hasFinished.current = false;
    startSpin();
  }

  useFrame((_, delta) => {
    const reel1Done = updateReel(reel1.current, reel1Ref.current, delta);
    const reel2Done = updateReel(reel2.current, reel2Ref.current, delta);
    const reel3Done = updateReel(reel3.current, reel3Ref.current, delta);

    if (reel1Done && reel2Done && reel3Done && !hasFinished.current) {
      hasFinished.current = true;
      finishSpin();
    }
  });

  return {
    reel1Ref,
    reel2Ref,
    reel3Ref,
    startMachine,
  };
}
