import type { SetStateAction, Dispatch, RefObject } from "react";
import type { SlotMachineHover } from "../slot-machine.scene";
import * as THREE from "three";

export function useCoinEntry(
  machineReady: RefObject<boolean>,
  setIsHover: Dispatch<SetStateAction<SlotMachineHover>>,
  coinRef: RefObject<THREE.Group>,
  coinDropping: RefObject<boolean>,
) {
  function insertCoin() {
    if (machineReady.current) return;
    coinRef.current.position.set(-0.715, 2.2, -0.13);
    setIsHover((prev) => ({
      ...prev,
      coinEntry: false,
    }));
    coinRef.current.visible = true;

    setTimeout(() => {
      machineReady.current = true;

      coinDropping.current = true;
    }, 200);
  }
  return { insertCoin };
}
