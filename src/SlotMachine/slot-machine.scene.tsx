import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SlotMachineModel } from "@/SlotMachine/models/machine.model";
import { CoinModel } from "@/SlotMachine/models/coin.model";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

import { useState, useRef } from "react";

export interface MouseActionState {
  dragging: boolean;
}

export interface SlotMachineHover {
  handle: boolean;
  coinEntry: boolean;
}

export default function SlotMachineScene() {
  const [mouseAction, setMouseAction] = useState<MouseActionState>({
    dragging: false,
  });
  const machineReady = useRef(false);
  const coinDropping = useRef(false);
  const coinRef = useRef<THREE.Group>(null);

  return (
    <Canvas onContextMenu={(e) => e.preventDefault()}>
      {!Object.values(mouseAction).some(Boolean) && (
        <OrbitControls
          enablePan={false}
          mouseButtons={{
            LEFT: THREE.MOUSE.PAN,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.ROTATE,
          }}
        />
      )}

      <Environment preset="warehouse" />
      <ambientLight intensity={2.5} />

      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
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
        />
      </group>
    </Canvas>
  );
}
