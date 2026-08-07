import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SlotMachineModel } from "@/SlotMachine/models/machine.model";
import { CoinModel } from "@/SlotMachine/models/coin.model";
import { Environment } from "@react-three/drei";
import { MOUSE, type Group } from "three";

import { useState, useRef, type SetStateAction, type Dispatch } from "react";
import { CameraZoom } from "./zoom.camera";

export interface MouseActionState {
  dragging: boolean;
}

export interface SlotMachineHover {
  handle: boolean;
  coinEntry: boolean;
}

interface SlotMachineSceneProps {
  setCoins: (delta: number) => void;
  setLine: (symbol: string) => void;
  clearLine: () => void;
  canPlay: boolean;
  gameStarted: boolean;
  setCanPlay: Dispatch<SetStateAction<boolean>>;
  setIsWinning: Dispatch<SetStateAction<boolean>>;
}

export default function SlotMachineScene({
  setCoins,
  setLine,
  clearLine,
  canPlay,
  gameStarted,
  setCanPlay,
  setIsWinning,
}: SlotMachineSceneProps) {
  const [mouseAction, setMouseAction] = useState<MouseActionState>({
    dragging: false,
  });
  const machineReady = useRef(false);
  const coinDropping = useRef(false);
  const coinRef = useRef<Group>(null);

  return (
    <Canvas
      onContextMenu={(e) => e.preventDefault()}
      camera={{
        position: [0, 2, 25],
        fov: 45,
        near: 0.1,
        far: 100,
      }}
    >
      <CameraZoom gameStarted={gameStarted} setCanPlay={setCanPlay} />
      {!Object.values(mouseAction).some(Boolean) && canPlay && (
        <OrbitControls
          enablePan={false}
          mouseButtons={{
            LEFT: MOUSE.PAN,
            MIDDLE: MOUSE.DOLLY,
            RIGHT: MOUSE.ROTATE,
          }}
        />
      )}

      <Environment preset="warehouse" />
      <ambientLight intensity={2} />

      <directionalLight position={[5, 10, 5]} intensity={0.5} castShadow />
      <group position={[0, -1.75, 0]}>
        <CoinModel
          position={[-0.715, 2.15, -0.1325]}
          visible={false}
          coinRef={coinRef}
          coinDropping={coinDropping}
        />
        <SlotMachineModel
          setMouseAction={setMouseAction}
          mouseAction={mouseAction}
          machineReady={machineReady}
          coinRef={coinRef}
          coinDropping={coinDropping}
          setCoins={setCoins}
          setLine={setLine}
          clearLine={clearLine}
          canPlay={canPlay}
          setIsWinning={setIsWinning}
        />
      </group>
    </Canvas>
  );
}
