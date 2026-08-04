import { useGLTF } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";

import type {
  MouseActionState,
  SlotMachineHover,
} from "@/SlotMachine/slot-machine.scene";
import { SetStateAction, Dispatch } from "react";
import { useNodes } from "@/hooks/useNodes";

import { useReels } from "../hooks/useReels";

import { getMachineMaterials } from "../materials/machine.materials";

import { useLever } from "../hooks/useLever";
import { useRef } from "react";

type SlotMachineModelProps = ThreeElements["group"] & {
  setMouseAction: Dispatch<SetStateAction<MouseActionState>>;
  mouseAction: MouseActionState;
  setMachineReady: Dispatch<SetStateAction<boolean>>;
  machineReady: boolean;
  insertCoin: () => void;
  isHover: SlotMachineHover;
  setIsHover: Dispatch<SetStateAction<SlotMachineHover>>;
  usingCoin: () => void;
};

export function SlotMachineModel({
  setMouseAction,
  mouseAction,
  setMachineReady,
  machineReady,
  insertCoin,
  isHover,
  setIsHover,
  usingCoin,
  ...props
}: SlotMachineModelProps) {
  const { nodes } = useNodes("slot-machine");

  const { reelMaterials, reels, machineMaterials } = getMachineMaterials();

  const isRolling = useRef(false);

  const { reel1Ref, reel2Ref, reel3Ref, startMachine } = useReels(
    setMachineReady,
    reels,
    isRolling,
  );

  const { handlePointerDown, handlePointerMove, handlePointerUp, leverRef } =
    useLever(
      machineReady,
      setMouseAction,
      mouseAction,
      setIsHover,
      startMachine,
      usingCoin,
      isRolling,
    );

  return (
    <group {...props} dispose={null} rotation={[0, Math.PI / 2, 0]}>
      <mesh
        // visible={false}
        geometry={nodes.Body.geometry}
        material={machineMaterials.body.default}
        scale={[0.66, 1.098, 0.666]}
      />
      <mesh
        geometry={nodes.CoinEntry.geometry}
        material={
          isHover.coinEntry && !machineReady && !isRolling.current
            ? machineMaterials.body.active
            : machineMaterials.body.default
        }
        scale={[0.66, 1.098, 0.666]}
        onPointerOver={() =>
          setIsHover((prev) => ({
            ...prev,
            coinEntry: true,
          }))
        }
        onPointerOut={() =>
          setIsHover((prev) => ({
            ...prev,
            coinEntry: false,
          }))
        }
        onClick={insertCoin}
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
            (mouseAction.dragging || isHover.handle) && !isRolling.current
              ? machineMaterials.handle.active
              : machineMaterials.handle.default
          }
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerMove={handlePointerMove}
          onPointerOver={() =>
            machineReady &&
            setIsHover((prev) => ({
              ...prev,
              handle: true,
            }))
          }
          onPointerOut={() =>
            setIsHover((prev) => ({
              ...prev,
              handle: false,
            }))
          }
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
