import { useRef } from "react";
import * as THREE from "three";
import { MouseActionState, SlotMachineHover } from "../slot-machine.scene";
import { type ThreeEvent, useFrame } from "@react-three/fiber";
import type { SetStateAction, Dispatch } from "react";

export function useLever(
  machineReady: boolean,
  setMouseAction: Dispatch<SetStateAction<MouseActionState>>,
  mouseAction: MouseActionState,
  setIsHover: Dispatch<SetStateAction<SlotMachineHover>>,
  startMachine: () => void,
  usingCoin: () => void,
) {
  const leverRef = useRef<THREE.Group>(null);
  const leverReturning = useRef(false);

  const dragStart = useRef({
    y: 0,
    rotation: Math.PI / 12,
  });

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
      setTimeout(() => {
        startMachine();
        usingCoin();
        leverReturning.current = true;
        setMouseAction((prev) => ({
          ...prev,
          dragging: false,
        }));
        setIsHover((prev) => ({
          ...prev,
          handle: false,
        }));
      }, 100);
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
  });

  return { handlePointerDown, handlePointerMove, handlePointerUp, leverRef };
}
