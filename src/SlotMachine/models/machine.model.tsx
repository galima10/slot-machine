import { useGLTF } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";

import type {
  MouseActionState,
  SlotMachineHover,
} from "@/SlotMachine/slot-machine.scene";
import { SetStateAction, Dispatch } from "react";

import { useReels } from "../hooks/useReels";

import { getMachineMaterials } from "../materials/machine.materials";

import { useLever } from "../hooks/useLever";
import { useRef, type RefObject, useState } from "react";
import { useCoinEntry } from "../hooks/useCoinEntry";
import type { Group } from "three";
import type { SlotMachineGLTFResult } from "@/SlotMachine/types/SlotMachine";

type SlotMachineModelProps = ThreeElements["group"] & {
  setMouseAction: Dispatch<SetStateAction<MouseActionState>>;
  mouseAction: MouseActionState;
  machineReady: RefObject<boolean>;
  coinRef: RefObject<Group>;
  coinDropping: RefObject<boolean>;
  setCoins: (delta: number) => void;
  setLine: (symbol: string) => void;
  clearLine: () => void;
  canPlay: boolean;
  setIsWinning: Dispatch<SetStateAction<boolean>>;
};

export function SlotMachineModel({
  setMouseAction,
  mouseAction,
  machineReady,
  coinRef,
  coinDropping,
  setCoins,
  setLine,
  clearLine,
  canPlay,
  setIsWinning,
  ...props
}: SlotMachineModelProps) {
  const gltf = useGLTF(`/models/slot-machine.glb`);
  const nodes = gltf.nodes as SlotMachineGLTFResult["nodes"];

  const { reelMaterials, reels, machineMaterials } = getMachineMaterials();

  const [isHover, setIsHover] = useState<SlotMachineHover>({
    handle: false,
    coinEntry: false,
  });

  const isRolling = useRef(false);

  const { reel1Ref, reel2Ref, reel3Ref, startMachine } = useReels(
    machineReady,
    reels,
    isRolling,
    setCoins,
    setLine,
    setIsWinning,
  );

  const { handlePointerDown, handlePointerMove, handlePointerUp, leverRef } =
    useLever(
      machineReady,
      setMouseAction,
      mouseAction,
      setIsHover,
      startMachine,
      isRolling,
      coinRef,
    );

  const { insertCoin } = useCoinEntry(
    machineReady,
    setIsHover,
    coinRef,
    coinDropping,
    setCoins,
    clearLine,
  );

  return (
    <group {...props} dispose={null} rotation={[0, Math.PI / 2, 0]}>
      <mesh
        geometry={nodes.Body.geometry}
        material={machineMaterials.body.default}
        scale={[0.66, 1.098, 0.666]}
      />
      <mesh
        geometry={nodes.LeverAttach.geometry}
        material={machineMaterials.body.default}
        scale={[0.66, 1.098, 0.666]}
      />
      <mesh
        geometry={nodes.CoinEntry.geometry}
        material={
          isHover.coinEntry && !machineReady.current && canPlay
            ? machineMaterials.body.active
            : machineMaterials.body.default
        }
        scale={[0.66, 1.098, 0.666]}
        onPointerOver={() => {
          if (machineReady.current) return;
          document.body.style.cursor = "pointer";
          setIsHover((prev) => ({
            ...prev,
            coinEntry: true,
          }));
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
          setIsHover((prev) => ({
            ...prev,
            coinEntry: false,
          }));
        }}
        onClick={canPlay && insertCoin}
      />
      <group
        ref={leverRef}
        rotation={[0, 0, Math.PI / 12]}
        position={[0.05, 1.352, 0.769]}
        scale={[0.018, 0.414, 0.018]}
      >
        <mesh
          geometry={nodes.Cylinder002.geometry}
          material={machineMaterials.rod}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.Cylinder002_1.geometry}
          material={
            (mouseAction.dragging || isHover.handle) &&
            !isRolling.current &&
            machineReady.current &&
            canPlay
              ? machineMaterials.handle.active
              : machineMaterials.handle.default
          }
          onPointerDown={(e) => {
            handlePointerDown(e);
            if (!machineReady.current || isRolling.current) return;
            document.body.style.cursor = "grabbing";
          }}
          onPointerUp={handlePointerUp}
          onPointerMove={handlePointerMove}
          onPointerOver={() => {
            if (!machineReady.current || isRolling.current) return;
            document.body.style.cursor = "grab";
            setIsHover((prev) => ({
              ...prev,
              handle: true,
            }));
          }}
          onPointerOut={() => {
            document.body.style.cursor = "default";
            setIsHover((prev) => ({
              ...prev,
              handle: false,
            }));
          }}
          castShadow
          receiveShadow
        />
      </group>
      <mesh
        ref={reel1Ref}
        geometry={nodes.Reel1.geometry}
        material={reelMaterials.reel1}
        position={[0.154, 1.972, -0.395]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.334, 0.193, 0.334]}
      />
      <mesh
        geometry={nodes.Reel1Caps.geometry}
        material={machineMaterials.rod}
        position={[0.154, 1.972, -0.395]}
        rotation={[Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.334, 0.193, 0.334]}
      />
      <mesh
        ref={reel2Ref}
        geometry={nodes.Reel2.geometry}
        material={reelMaterials.reel2}
        position={[0.154, 1.972, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.334, 0.193, 0.334]}
      />
      <mesh
        geometry={nodes.Reel2Caps.geometry}
        material={machineMaterials.rod}
        position={[0.154, 1.972, 0]}
        rotation={[Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.334, 0.193, 0.334]}
      />
      <mesh
        ref={reel3Ref}
        geometry={nodes.Reel3.geometry}
        material={reelMaterials.reel3}
        position={[0.154, 1.972, 0.395]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.334, 0.193, 0.334]}
      />
      <mesh
        geometry={nodes.Reel3Caps.geometry}
        material={machineMaterials.rod}
        position={[0.154, 1.972, 0.395]}
        rotation={[Math.PI / 2, Math.PI / 2, 0]}
        scale={[0.334, 0.193, 0.334]}
      />
    </group>
  );
}

useGLTF.preload("/slot-machine.glb");
