import * as THREE from "three";
import { useRef, useMemo } from "react";
import { type ThreeEvent, useFrame } from "@react-three/fiber";
import type {
  MouseActionState,
  SlotMachineHover,
} from "@/scenes/SlotMachineScene";
import type { SetStateAction, Dispatch } from "react";
import { generateReelsSymbols } from "@/utils/generateReelsSymbols";
import { createReelTexture } from "@/utils/createReelTexture";
import { getRandomInt } from "@/utils/getRandomInt";

interface ReelState {
  start: number;
  target: number;
  progress: number;
  duration: number;
  rolling: boolean;
  currentIndex: number;
}

export function useSlotMachine(
  setMouseAction: Dispatch<SetStateAction<MouseActionState>>,
  mouseAction: MouseActionState,
  setMachineReady: Dispatch<SetStateAction<boolean>>,
  machineReady: boolean,
  isHover: SlotMachineHover,
  setIsHover: Dispatch<SetStateAction<SlotMachineHover>>,
  usingCoin: () => void,
) {
  const leverRef = useRef<THREE.Group>(null);
  const reel1Ref = useRef<THREE.Mesh>(null);
  const reel2Ref = useRef<THREE.Mesh>(null);
  const reel3Ref = useRef<THREE.Mesh>(null);

  const isRolling = useRef(false);

  const reel1 = useRef<ReelState>({
    start: 0,
    target: 0,
    progress: 0,
    duration: 2.5,
    rolling: false,
    currentIndex: 0,
  });

  const reel2 = useRef<ReelState>({
    start: 0,
    target: 0,
    progress: 0,
    duration: 3.2,
    rolling: false,
    currentIndex: 0,
  });

  const reel3 = useRef<ReelState>({
    start: 0,
    target: 0,
    progress: 0,
    duration: 4.0,
    rolling: false,
    currentIndex: 0,
  });

  const materials = {
    body: {
      default: useMemo(
        () =>
          new THREE.MeshLambertMaterial({
            color: "#38266c",
          }),
        [],
      ),
      active: useMemo(
        () =>
          new THREE.MeshLambertMaterial({
            color: "#5438a9",
          }),
        [],
      ),
    },
    rod: useMemo(
      () =>
        new THREE.MeshLambertMaterial({
          color: "#ffffff",
        }),
      [],
    ),
    handle: {
      default: useMemo(
        () =>
          new THREE.MeshLambertMaterial({
            color: "#900b0b",
          }),
        [],
      ),
      active: useMemo(
        () =>
          new THREE.MeshLambertMaterial({
            color: "#c91d1d",
          }),
        [],
      ),
    },
  };

  const reels = useMemo(() => generateReelsSymbols(), []);
  console.log(reels);

  const reelTexture1 = useMemo(() => createReelTexture(reels.reel1), []);

  const reelTexture2 = useMemo(() => createReelTexture(reels.reel2), []);

  const reelTexture3 = useMemo(() => createReelTexture(reels.reel3), []);

  const reelMaterial1 = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: reelTexture1,
        roughness: 1,
        metalness: 0,
      }),
    [reelTexture1],
  );

  const reelMaterial2 = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: reelTexture2,
      }),
    [reelTexture2],
  );

  const reelMaterial3 = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: reelTexture3,
      }),
    [reelTexture3],
  );

  const dragStart = useRef({
    y: 0,
    rotation: Math.PI / 12,
  });

  const leverReturning = useRef(false);

  function handlePointerDown(e: ThreeEvent<PointerEvent>) {
    if (!machineReady) return;
    e.stopPropagation();

    (e.target as Element).setPointerCapture(e.pointerId);

    dragStart.current = {
      y: e.clientY,
      rotation: leverRef.current?.rotation.x ?? 0,
    };

    setMouseAction((prev) => ({
      ...prev,
      dragging: true,
    }));
  }

  function handlePointerMove(e: ThreeEvent<PointerEvent>) {
    if (!mouseAction.dragging || !leverRef.current) return;

    const deltaY = e.clientY - dragStart.current.y;

    const maxAngle = Math.PI / 1.5;

    leverRef.current.rotation.z = THREE.MathUtils.clamp(
      dragStart.current.rotation + deltaY * 0.01,
      Math.PI / 12,
      maxAngle,
    );

    if (leverRef.current.rotation.z === maxAngle) {
      startMachine();
    }
  }

  function handlePointerUp(e: ThreeEvent<PointerEvent>) {
    e.stopPropagation();

    (e.target as Element).releasePointerCapture(e.pointerId);

    leverReturning.current = true;

    setMouseAction((prev) => ({
      ...prev,
      dragging: false,
    }));
    setIsHover((prev) => ({
      ...prev,
      handle: false,
    }));
  }

  function returnLever(delta: number) {
    if (mouseAction.dragging || !leverRef.current || !leverReturning.current)
      return;

    const current = leverRef.current.rotation.z;

    const speed = 8;

    leverRef.current.rotation.z = THREE.MathUtils.lerp(
      current,
      Math.PI / 12,
      delta * speed,
    );

    if (Math.abs(leverRef.current.rotation.z) < 0.01) {
      leverRef.current.rotation.z = Math.PI / 12;
      leverReturning.current = false;
    }
  }

  useFrame((_, delta) => {
    returnLever(delta);
    const reel1Done = updateReel(reel1.current, reel1Ref.current, delta);
    const reel2Done = updateReel(reel2.current, reel2Ref.current, delta);
    const reel3Done = updateReel(reel3.current, reel3Ref.current, delta);

    if (reel1Done && reel2Done && reel3Done) {
      finishSpin();
    }
  });

  function finishSpin() {
    if (!isRolling.current) return;
    isRolling.current = false;
    setTimeout(() => {
      setMachineReady(false);
    }, 1000);
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

      const symbolAngle = (Math.PI * 2) / 10;

      // Snap exact sur une position de symbole
      mesh.rotation.y = Math.round(mesh.rotation.y / symbolAngle) * symbolAngle;

      reel.rolling = false;
      return true;
    }

    return false;
  }

  function startSpin() {
    const reel1Index = getRandomInt(10);
    const reel2Index = getRandomInt(10);
    const reel3Index = getRandomInt(10);

    setupReel(reel1.current, reel1Ref.current, reel1Index, 5);
    setupReel(reel2.current, reel2Ref.current, reel2Index, 7);
    setupReel(reel3.current, reel3Ref.current, reel3Index, 9);
  }

  function setupReel(
    reel: ReelState,
    mesh: THREE.Mesh,
    targetIndex: number,
    turns: number,
  ) {
    const symbolAngle = (Math.PI * 2) / 10;

    const halfSymbol = symbolAngle / 2;

    const currentIndex = reel.currentIndex;

    const distance = (targetIndex - currentIndex + 10) % 10;

    reel.start = mesh.rotation.y;

    reel.target =
      reel.start + turns * Math.PI * 2 + distance * symbolAngle + halfSymbol;

    reel.progress = 0;
    reel.rolling = true;

    reel.currentIndex = targetIndex;
  }

  function startMachine() {
    isRolling.current = true;
    startSpin();
    usingCoin();

    setTimeout(() => {
      leverReturning.current = true;
      setMouseAction((prev) => ({
        ...prev,
        dragging: false,
      }));
      setIsHover((prev) => ({
        ...prev,
        handle: false,
      }));
    }, 2000);
  }

  return {
    materials,
    isHover,
    setIsHover,
    leverRef,
    handlePointerDown,
    handlePointerUp,
    handlePointerMove,
    reel1Ref,
    reel2Ref,
    reel3Ref,
    reelMaterial1,
    reelMaterial2,
    reelMaterial3,
  };
}
